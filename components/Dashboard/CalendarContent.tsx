'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Linkedin, Twitter, FileText, MoreVertical } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  scheduledFor: string;
  status: string;
  platform: string;
  mediaUrls: string[];
}

interface CalendarContentProps {
  posts: Post[];
}

const CalendarContent = ({ posts }: CalendarContentProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'list'>('month');

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-sky-500" />;
      case 'dev.to':
        return <FileText className="w-4 h-4 text-gray-700" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'bg-blue-100 border-blue-300';
      case 'twitter':
        return 'bg-sky-100 border-sky-300';
      case 'dev.to':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getPostsForDate = (date: Date | null) => {
    if (!date) return [];
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (posts.length === 0) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scheduled Posts</h3>
          <p className="text-gray-500">Schedule your first post to see it appear on the calendar.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {weekDays.map(day => (
            <div key={day} className="p-4 text-center text-sm font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayPosts = day ? getPostsForDate(day) : [];
            const dayPostedPosts = day ? getPostsForDate(day) : [];
            const isToday = day && day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
                  !day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                      {day.getDate()}
                      {isToday && <span className="ml-1 text-xs">(Today)</span>}
                    </div>
                    <div className="space-y-1">
                      {dayPostedPosts.slice(0, 2).map(post => (
                        <div
                          key={post.id}
                          className={`text-xs p-1.5 rounded border bg-green-50 border-green-300 cursor-pointer hover:shadow-sm transition-shadow`}
                          title={post.content}
                        >
                          <div className="flex items-center gap-1">
                            {getPlatformIcon(post.platform)}
                            <span className="font-medium text-green-700">Posted</span>
                          </div>
                        </div>
                      ))}
                      {dayPosts.slice(0, 2).map(post => (
                        <div
                          key={post.id}
                          className={`text-xs p-1.5 rounded border ${getPlatformColor(post.platform)} cursor-pointer hover:shadow-sm transition-shadow`}
                        >
                          <div className="flex items-center gap-1 mb-0.5">
                            {getPlatformIcon(post.platform)}
                            <span className="font-medium">{formatTime(post.scheduledFor)}</span>
                          </div>
                          <div className="line-clamp-2 text-gray-700">
                            {post.content}
                          </div>
                        </div>
                      ))}
                      {dayPosts.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium pl-1">
                          +{dayPosts.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const groupedPosts = posts.reduce((acc, post) => {
      const dateKey = new Date(post.scheduledFor).toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(post);
      return acc;
    }, {} as Record<string, Post[]>);

    const sortedDates = Object.keys(groupedPosts).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );

    return (
      <div className="space-y-6">
        {sortedDates.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scheduled Posts</h3>
            <p className="text-gray-500">You don't have any scheduled posts at the moment.</p>
          </div>
        ) : (
          sortedDates.map(dateKey => {
            const date = new Date(dateKey);
            const datePosts = groupedPosts[dateKey];
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div key={dateKey} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className={`p-4 border-b border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <h3 className="font-semibold text-gray-900">
                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    {isToday && <span className="ml-2 text-sm text-blue-600">(Today)</span>}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{datePosts.length} scheduled post{datePosts.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {datePosts
                    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
                    .map(post => (
                      <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-16 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatTime(post.scheduledFor).split(' ')[0]}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(post.scheduledFor).split(' ')[1]}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`px-3 py-1 rounded-full border ${getPlatformColor(post.platform)} flex items-center gap-1.5`}>
                                {getPlatformIcon(post.platform)}
                                <span className="text-xs font-medium capitalize">{post.platform}</span>
                              </div>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                Scheduled
                              </span>
                              {post.mediaUrls.length > 0 && (
                                <span className="text-xs text-gray-500">📷 {post.mediaUrls.length} image(s)</span>
                              )}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{post.content}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  const totalScheduled = posts.length;
  const linkedinCount = posts.filter(p => p.platform.toLowerCase() === 'linkedin').length;
  const twitterCount = posts.filter(p => p.platform.toLowerCase() === 'twitter').length;
  const devtoCount = posts.filter(p => p.platform.toLowerCase() === 'dev.to').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-indigo-600" />
                Content Calendar
              </h1>
              <p className="text-gray-600 mt-1">Manage and schedule your social media posts</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'month' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {view === 'month' && (
            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">{getMonthName(currentDate)}</h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">{totalScheduled}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">LinkedIn</p>
                  <p className="text-2xl font-bold text-gray-900">{linkedinCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <Twitter className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Twitter</p>
                  <p className="text-2xl font-bold text-gray-900">{twitterCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dev.to</p>
                  <p className="text-2xl font-bold text-gray-900">{devtoCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {view === 'month' && renderMonthView()}
        {view === 'list' && renderListView()}
      </div>
    </div>
  );
};

export default CalendarContent;
