import { ArrowUpRight } from "lucide-react";

const galleryData = [
  {
    id: 1,
    title: "Zoo Trip",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/images/photo1.webp",
    size: "small",
  },
  {
    id: 2,
    title: "Goa Trip",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/images/photo2.webp",
    size: "large",
  },
  {
    id: 3,
    title: "Hiking",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/images/photo3.webp",
    size: "small",
  },
];

const GallerySection = () => {
  return (
    <div className="container-padding">

      {/* Sub heading */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-lg font-semibold">Photo Gallery</h2>
        <p className="text-xs font-normal">See more</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 auto-rows-[180px]">

        {galleryData.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-3xl overflow-hidden group
              ${item.size === "large" ? "row-span-2" : ""}
            `}
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-xs opacity-80 line-clamp-2">
                {item.desc}
              </p>
            </div>

            {/* Arrow Button */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
              <ArrowUpRight size={18} className="text-black" />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default GallerySection;