import React, { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import PageHeader from '../../components/common/headers/PageHeader'
import { useAuth } from '../../context/AuthContext'
import { getEVideos } from '../../api/evideosApi'
import { toast } from 'react-hot-toast'

const EVideos = () => {

    const { student } = useAuth();

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);

                const res = await getEVideos(student?.class_id);

                // console.log("API Response:", res);

                if (res.status) {
                    setVideos(res.data);
                } else {
                    setVideos([]);
                    toast.error(res.message || "No videos found");
                }

            } catch (err) {
                console.error(err);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        if (student?.class_id) {
            fetchVideos();
        }
    }, [student]);

    return (
        <div className='flex flex-col gap-4 bg-primary pt-4 min-h-screen'>
            <PageHeader title="E Videos Page" color="white" />

            <div className='relative flex flex-col gap-2 pb-12 px-4 min-h-screen bg-white py-4 rounded-t-[50px]'>

                {/* 🔄 Loading */}
                {loading && (
                    <p className='text-center text-sm text-gray-500 mt-4'>
                        Loading videos...
                    </p>
                )}

                {/* ❌ No Data */}
                {!loading && videos.length === 0 && (
                    <p className='text-center text-sm text-gray-500 mt-4'>
                        No videos available
                    </p>
                )}

                {/* ✅ Video List */}
                {!loading && videos.map((video) => (
                    <div
                        key={video.id}
                        className='flex items-center justify-between p-3 shadow-md rounded-full bg-primary/30 border border-primary backdrop-blur-md'
                    >
                        <div className='flex items-center gap-2 w-[80%]'>
                            <div className='w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center border border-primary-dark'>
                                <Play size={18} className='text-primary-dark' />
                            </div>

                            <div className='w-[80%]'>
                                <h3 className='text-sm font-medium line-clamp-1'>
                                    {video.title}
                                </h3>

                                <p className='text-[12px] text-label font-normal'>
                                    {video.subject}
                                </p>
                            </div>
                        </div>

                        {/* ▶ Watch Button */}
                        <button
                            onClick={() => window.open(video.link, "_blank")}
                            className='text-[12px] font-medium text-primary-dark'
                        >
                            Watch
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default EVideos