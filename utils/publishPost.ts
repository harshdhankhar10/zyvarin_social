import axios from 'axios';

interface PublishPostParams {
  platform: string;
  content: string;
  mediaUrls?: string[];
  mediaAlts?: string[];
  postType?: 'immediate' | 'scheduled';
  scheduledFor?: string | null;
}

interface PublishResult {
  platform: string;
  success: boolean;
  message: string;
  error?: string;
}

export async function publishPost(params: PublishPostParams): Promise<PublishResult> {
  const { platform, content, mediaUrls = [], mediaAlts = [], postType = 'immediate', scheduledFor = null } = params;
  
  const stripMarkdownBasic = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1');
  };

  const formatContentForPlatform = (plat: string, text: string): string => {
    const cleaned = plat === 'devto' ? text : stripMarkdownBasic(text);
    if (plat === 'twitter') {
      const trimmed = cleaned.trim();
      return trimmed.length > 280 ? trimmed.slice(0, 280) : trimmed;
    }
    if (plat === 'pinterest') {
      const trimmed = cleaned.trim();
      return trimmed.length > 500 ? trimmed.slice(0, 500) : trimmed;
    }
    if (plat === 'linkedin') {
      return cleaned.trim();
    }
    return cleaned.trim();
  };

  const formattedContent = formatContentForPlatform(platform, content);

  let platformName = platform;
  if (platform === 'devto') platformName = 'dev_to';

  try {
    const response = await axios.post(`/api/social/${platformName}/post`, {
      content: formattedContent,
      mediaUrls,
      mediaAlts,
      postType,
      scheduledFor
    });

    const data = response.data;
    const displayPlatform = platformName === 'dev_to' ? 'devto' : platformName;

    if (data.success) {
      return {
        platform: displayPlatform,
        success: true,
        message: `✅ ${postType === 'scheduled' ? 'Scheduled' : 'Posted'}`
      };
    } else {
      return {
        platform: displayPlatform,
        success: false,
        message: `❌ ${data.error}`,
        error: data.error
      };
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || 'Failed to connect';
    const displayPlatform = platformName === 'dev_to' ? 'devto' : platformName;
    
    return {
      platform: displayPlatform,
      success: false,
      message: `❌ ${errorMsg}`,
      error: errorMsg
    };
  }
}


export async function publishToMultiplePlatforms(
  platforms: string[],
  content: string,
  mediaUrls: string[] = [],
  mediaAlts: string[] = [],
  postType: 'immediate' | 'scheduled' = 'immediate',
  scheduledFor: string | null = null
): Promise<{
  results: PublishResult[];
  successCount: number;
  totalCount: number;
  message: string;
}> {
  const results: PublishResult[] = [];

  for (const platform of platforms) {
    const result = await publishPost({
      platform,
      content,
      mediaUrls,
      mediaAlts,
      postType,
      scheduledFor
    });
    results.push(result);
  }

  const successCount = results.filter(r => r.success).length;
  const totalCount = platforms.length;
  const action = postType === 'scheduled' ? 'Scheduled' : 'Posted';

  const message = successCount === totalCount
    ? `✅ Successfully ${action.toLowerCase()} to all ${totalCount} platform${totalCount > 1 ? 's' : ''}!`
    : `${action} to ${successCount} of ${totalCount} platforms. ${results.map(r => `${r.platform}: ${r.message}`).join(' | ')}`;

  return {
    results,
    successCount,
    totalCount,
    message
  };
}
