import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/common/headers/PageHeader'
import { Bell } from "lucide-react"
import { fetchNotifications } from '../../api/notificationApi'
import NotificationLoader from '../../components/loader/NotificationLoader'
import { useAuth } from '../../context/AuthContext'

const NotificationScreen = () => {

  const { student } = useAuth()

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

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

  // 📌 Grouping logic (Today / Yesterday / Older)
  const groupByDate = (data) => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    const groups = {}

    data.forEach(item => {
      const itemDate = new Date(item.date).toDateString()

      let key = "Older"
      if (itemDate === today) key = "Today"
      else if (itemDate === yesterday) key = "Yesterday"

      if (!groups[key]) groups[key] = []
      groups[key].push({
        title: item.title,
        desc: item.title,
        time: new Date(item.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        icon: Bell,
        color: "bg-primary/10 text-primary"
      })
    })

    return Object.keys(groups).map(section => ({
      section,
      items: groups[section]
    }))
  }

  return (
    <div className='flex flex-col gap-4 pb-12 pt-4 bg-white min-h-screen'>

      <PageHeader title="Notifications" />

      {/* ✅ Loader (full control, no nested padding issue) */}
      {loading ? (
        <NotificationLoader />
      ) : notifications.length === 0 ? (

        <div className="flex justify-center items-center flex-1">
          <p className="text-label text-sm">No notifications found</p>
        </div>

      ) : (

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

                  return (
                    <div key={i} className="flex gap-4 items-start">

                      {/* Content */}
                      <div className="flex-1">

                        <div className="flex justify-between items-start">
                          <h3 className="text-[14px] font-semibold">
                            {item.title}
                          </h3>

                          <span className="text-[12px] text-label whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>

                      </div>

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