import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/headers/PageHeader'
import { Bell } from "lucide-react"
import { fetchNotifications } from '../../api/notificationApi'
import NotificationLoader from '../../components/loader/NotificationLoader'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { motion } from "framer-motion"

const NotificationScreen = () => {

  const { student } = useAuth()

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  const { setUnreadCount } = useNotification()

  useEffect(() => {
    if (notifications.length > 0) {
      setUnreadCount(0) // mark all as read when opened
    }
  }, [])

  // 📌 Fetch notifications
  const loadNotifications = async () => {
    setLoading(true)
    try {
      const res = await fetchNotifications({
        school_id: student?.school_id,
        class_id: student?.class_id,
      })

      if (res?.status) {
        setNotifications(groupByDate(res.data || []))
      } else {
        setNotifications([])
      }

    } catch (err) {
      console.error("Notification Error:", err)
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (student?.school_id) {
      loadNotifications()
    }
  }, [student])

  // 📌 Grouping logic
  const groupByDate = (data) => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    const groups = {}

    data.forEach((item, index) => {
      const dateObj = new Date(item.date)
      const itemDate = dateObj.toDateString()

      let key = "Older"
      if (itemDate === today) key = "Today"
      else if (itemDate === yesterday) key = "Yesterday"

      if (!groups[key]) groups[key] = []

      const uniqueId = item.id || `${item.title}-${item.date}-${index}`

      groups[key].push({
        id: uniqueId,
        title: item.title,
        desc: item.desc || item.title,

        time: dateObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),

        formattedDate: dateObj.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short'
        }),

        isRead: item.is_read ?? false,
        icon: Bell
      })
    })

    return Object.keys(groups).map(section => ({
      section,
      items: groups[section]
    }))
  }

  // 🗑️ Handle delete
  const handleDelete = (id) => {
    const updated = notifications
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.id !== id)
      }))
      .filter(group => group.items.length > 0)

    setNotifications(updated)
  }

  return (
    <div className='flex flex-col gap-4 pb-12 pt-4 bg-gray-50 min-h-screen overflow-x-hidden'>

      <PageHeader title="Notifications" />

      {loading ? (
        <NotificationLoader />
      ) : notifications.length === 0 ? (

        <div className="flex justify-center items-center flex-1">
          <p className="text-label text-sm">No notifications found</p>
        </div>

      ) : (

        <div className="mt-2 space-y-8 px-4">

          {notifications.map((group) => (
            <div key={group.section}>

              {/* 📌 Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">
                  {group.section}
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* 📦 Cards */}
              <div className="space-y-4">
                {group.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-2xl"
                    >

                      {/* 🔴 Background Action */}
                      <div className="absolute inset-0 flex justify-end items-center pr-4 bg-red-500">
                        <span className="text-white text-sm">Delete</span>
                      </div>

                      {/* 🟦 Swipe Card */}
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: -120, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                          if (info.offset.x < -80) {
                            handleDelete(item.id)
                          }
                        }}
                        className={`w-full relative flex items-start gap-4 p-4 rounded-2xl shadow-sm border
                        ${item.isRead ? 'bg-white' : 'bg-primary border-primary-dark'}`}
                      >

                        {/* 🔵 Unread Dot */}
                        {!item.isRead && (
                          <span className="absolute top-4 right-4 w-2 h-2 bg-primary-dark rounded-full" />
                        )}

                        {/* 🔔 Icon */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-dark text-white">
                          <Icon size={18} />
                        </div>

                        {/* 📄 Content */}
                        <div className="flex-1">

                          {/* 📅 Date */}
                          <p className="text-[11px] text-white/70 mb-1">
                            {item.formattedDate} • {item.time}
                          </p>

                          {/* 📝 Title */}
                          <h3 className="text-[14px] font-normal text-white">
                            {item.title}
                          </h3>

                          {/* 📃 Description */}
                          {/* <p className="text-[12px] text-label mt-1">
                            {item.desc}
                          </p> */}

                        </div>

                      </motion.div>

                    </div>
                  )
                })}
              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  )
}

export default NotificationScreen