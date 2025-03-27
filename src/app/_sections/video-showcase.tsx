export const VideoShowcase = () => {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-xl border shadow-xl"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    );
  };