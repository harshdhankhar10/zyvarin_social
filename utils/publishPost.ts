import axios from 'axios';
import { validateScheduleTime } from './timezoneUtils';

interface PublishPostParams {
  platform: string;
  content: string;
  mediaUrls?: string[];
  mediaAlts?: string[];
  logo?: string;
  postType?: 'immediate' | 'scheduled';
  scheduledFor?: string | null;
  userTimezone?: string | null;
}

interface PublishResult {
  platform: string;
  success: boolean;
  message: string;
  error?: string;
}

export async function publishPost(params: PublishPostParams): Promise<PublishResult> {
  const { platform, content, mediaUrls = [], mediaAlts = [], logo, postType = 'immediate', scheduledFor = null, userTimezone = null } = params;
  
  if (postType === 'scheduled') {
    const validation = validateScheduleTime(scheduledFor, userTimezone);
    if (!validation.valid) {
      return {
        platform,
        success: false,
        message: `❌ ${validation.error}`,
        error: validation.error
      };
    }
  }

  let finalMediaUrls = [...mediaUrls];
  let finalMediaAlts = [...mediaAlts];

  if (logo && !finalMediaUrls.includes(logo)) {
    finalMediaUrls.unshift(logo);
    finalMediaAlts.unshift('Brand Logo');
  }

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
      mediaUrls: finalMediaUrls,
      mediaAlts: finalMediaAlts,
      postType,
      scheduledFor: postType === 'scheduled' ? scheduledFor : null,
      userTimezone
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
      console.error(`[${displayPlatform}] API Error:`, data.error);
      return {
        platform: displayPlatform,
        success: false,
        message: `❌ ${data.error}`,
        error: data.error
      };
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.message || 'Failed to connect';
    const displayPlatform = platformName === 'dev_to' ? 'devto' : platformName;
    
    console.error(`[${displayPlatform}] Publish Error:`, {
      status: error.response?.status,
      error: errorMsg,
      data: error.response?.data
    });
    
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
  scheduledFor: string | null = null,
  userTimezone: string | null = null
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
      scheduledFor,
      userTimezone
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
