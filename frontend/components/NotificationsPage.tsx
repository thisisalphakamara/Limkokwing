
import React, { useState } from 'react';
import { UserRole } from '../types';

interface Notification {
  id: string;
  type: 'approval' | 'rejection' | 'info' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationsPageProps {
  userRole: UserRole;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Registration Approved by Year Leader',
    message: 'Your semester registration has been approved by the Year Leader and forwarded to Faculty Admin for review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Registration Submitted Successfully',
    message: 'Your registration for Semester 1 2024/2025 has been submitted and is pending Year Leader approval.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Complete Your Profile',
    message: 'Please update your contact information to ensure you receive important notifications.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance Scheduled',
    message: 'The registration portal will be under maintenance on Sunday, 10:00 PM - 2:00 AM.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
  },
];

const NotificationsPage: React.FC<NotificationsPageProps> = ({ userRole }) => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return '✓';
      case 'rejection':
        return '✕';
      case 'info':
        return 'i';
      case 'reminder':
        return '!';
      case 'system':
        return '⚙';
      default:
        return '•';
    }
  };

  const getTypeStyle = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return 'bg-black text-white';
      case 'rejection':
        return 'bg-gray-600 text-white';
      case 'info':
        return 'bg-gray-400 text-white';
      case 'reminder':
        return 'bg-gray-800 text-white';
      case 'system':
        return 'bg-gray-300 text-black';
      default:
        return 'bg-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 border border-black text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Mark All Read
          </button>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
            filter === 'all' ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
            filter === 'unread' ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      <div className="bg-white border border-black divide-y divide-gray-100">
        {filteredNotifications.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
              ✓
            </div>
            <p className="text-sm font-bold uppercase text-gray-400">No notifications</p>
            <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 flex items-start space-x-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.read ? 'bg-gray-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getTypeStyle(notification.type)}`}>
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm ${!notification.read ? 'font-bold' : 'font-medium'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-black flex-shrink-0 ml-2 mt-1" />
                  )}
                </div>
                <p className="text-[10px] font-bold uppercase text-gray-400 mt-2">
                  {formatTimestamp(notification.timestamp)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      <div className="bg-white border border-black p-6">
        <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Notification Preferences</h4>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 border border-gray-200 hover:border-black transition-colors cursor-pointer">
            <div>
              <p className="text-sm font-bold">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates via email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 border-2 border-black" />
          </label>
          <label className="flex items-center justify-between p-3 border border-gray-200 hover:border-black transition-colors cursor-pointer">
            <div>
              <p className="text-sm font-bold">SMS Notifications</p>
              <p className="text-xs text-gray-500">Receive updates via SMS</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 border-2 border-black" />
          </label>
          <label className="flex items-center justify-between p-3 border border-gray-200 hover:border-black transition-colors cursor-pointer">
            <div>
              <p className="text-sm font-bold">Approval Reminders</p>
              <p className="text-xs text-gray-500">Get reminded about pending approvals</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 border-2 border-black" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
