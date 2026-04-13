import React from 'react'
import PageHeader from '../../components/common/headers/PageHeader'
import { Bell, CalendarDays, BarChart3, PhoneMissed } from "lucide-react";

const NotificationScreen = () => {

  const notifications = [
    {
      section: "Today",
      items: [
        {
          title: "Calling Minutes are Low ⚠️",
          desc: "You’re running low on your monthly minutes. Recharge now to avoid call interruptions.",
          time: "9 min ago",
          count: 2,
          color: "bg-green-100 text-green-600",
          icon: Bell,
        },
        {
          title: "New Feature Available 🎉",
          desc: "Learn more about managing account info and activity.",
          time: "14 min ago",
          color: "bg-yellow-100 text-yellow-600",
          icon: Bell,
        },
        {
          title: "Plan Successfully Renewed ✅",
          desc: "Your calling plan has been renewed.",
          time: "9 min ago",
          count: 2,
          color: "bg-red-100 text-red-500",
          icon: Bell,
        },
      ],
    },
    {
      section: "Yesterday",
      items: [
        {
          title: "Reminder for your PTM 📅",
          desc: "Your Parent-Teacher Meeting is scheduled for tomorrow.",
          time: "9 min ago",
          count: 2,
          color: "bg-teal-100 text-teal-600",
          icon: CalendarDays,
        },
        {
          title: "Weekly Usage Summary 📊",
          desc: "You’ve used 120 minutes this week. Keep track to manage your monthly limit better.",
          time: "14 min ago",
          color: "bg-amber-100 text-amber-600",
          icon: BarChart3,
        },
        {
          title: "Missed Call Alert 📞",
          desc: "You missed a call from your parent. Tap here to call them back instantly.",
          time: "9 min ago",
          count: 2,
          color: "bg-pink-100 text-pink-600",
          icon: PhoneMissed,
        },
      ],
    },
  ];


  return (
    <div className='flex flex-col gap-4 pb-12 pt-4 bg-white'>
      <PageHeader title="Notifications" />

      <div className="mt-2 space-y-6 container-padding">

        {notifications.map((group, index) => (
          <div key={index}>

            {/* Section Title */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[14px] font-semibold text-label">
                {group.section}
              </h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Items */}
            <div className="space-y-6">
              {group.items.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div key={i} className="flex gap-4 items-start">

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">

                      {/* Title + Time */}
                      <div className="flex justify-between items-start">
                        <h3 className="text-[14px] font-semibold">
                          {item.title}
                        </h3>
                        <span className="text-[12px] text-label whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>

                      <div className='flex items-center justify-between'>
                        {/* Description */}
                        <p className="text-[12px] text-label line-clamp-2 mt-1 max-w-[80%] leading-relaxed">
                          {item.desc}
                        </p>


                        {/* Count Badge */}
                        {item.count && (
                          <div className="w-6 h-6 bg-teal-600 text-white text-[10px] rounded-full flex items-center justify-center">
                            {item.count}
                          </div>
                        )}

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default NotificationScreen
