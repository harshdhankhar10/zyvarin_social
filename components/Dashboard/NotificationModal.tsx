"use client"
import React from 'react';
import { X, Bell, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  senderType: 'ADMIN' | 'SYSTEM';
  createdAt: string | Date;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  const getSenderIcon = (senderType: 'ADMIN' | 'SYSTEM') => {
    if (senderType === 'ADMIN') {
      return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
    return <Info className="w-5 h-5 text-gray-500" />;
  };

  const getNotificationIcon = (notification: Notification) => {
    if (notification.title.toLowerCase().includes('success') || notification.title.toLowerCase().includes('completed')) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (notification.title.toLowerCase().includes('warning') || notification.title.toLowerCase().includes('alert')) {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
    if (notification.title.toLowerCase().includes('error') || notification.title.toLowerCase().includes('failed')) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
    return getSenderIcon(notification.senderType);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col mx-4 animate-in slide-in-from-top duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Bell className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500">{notifications.length} total notification{notifications.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <Bell className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-sm text-gray-500">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border  ${
                  !notification.isRead
                    ? 'bg-indigo-50/50 border-indigo-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="flex-shrink-0 w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                        {notification.senderType === 'ADMIN' ? '👤 Admin' : '⚙️ System'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {notifications.filter(n => !n.isRead).length} unread notification{notifications.filter(n => !n.isRead).length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
