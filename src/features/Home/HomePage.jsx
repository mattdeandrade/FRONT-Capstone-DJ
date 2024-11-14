import React from "react";
import "./HomePage.css";

/** Home page component */
function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to DJ Stream!</h1>
      <p>Your ultimate destination for DJ tracks and mixes.</p>

      {/* Image below the heading */}
      <img
        src="https://i.postimg.cc/ZYF686sj/image-155-960x657-jpeg.webp"
        alt="DJ Stream"
        className="home-page-image"
      />

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>
          DJ Stream is designed to help DJs create, share, and manage their
          playlists seamlessly. Here's how it works:
        </p>
        <ul>
          <li>
            Log in with your Spotify account to access your music library.
          </li>
          <li>
            Upload your custom tracks and effects, including transitions and
            loops.
          </li>
          <li>
            Edit your tracks' tempo, pitch, and splice lengths to create the
            perfect mix.
          </li>
          <li>
            Create and manage playlists, then share them with your fans using
            unique links.
          </li>
        </ul>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <p>
          Our platform offers a wide range of tools to make your DJing
          experience even better:
        </p>
        <ul>
          <li>
            Spotify Integration – Pull tracks from your personal Spotify
            library.
          </li>
          <li>
            Track Uploads – Upload your own custom tracks and effects (MP3,
            transitions).
          </li>
          <li>
            Audio Editing – Modify tempo, pitch, splice lengths, and apply
            various effects.
          </li>
          <li>
            Playlist Management – Create, edit, and delete your playlists with
            ease.
          </li>
          <li>
            Sharing – Share your playlists with a custom link and showcase your
            mixes.
          </li>
        </ul>
      </section>

      {/* Featured DJs Section */}
      <section className="featured-djs">
        <h2>Featured DJs</h2>
        <p>
          Check out some of the top DJs on our platform who are creating amazing
          mixes:
        </p>
        <div className="dj-list">
          <div className="dj">
            <h3>DJ Alpha</h3>
            <p>Known for his high-energy mixes and exclusive club sets.</p>
          </div>
          <div className="dj">
            <h3>DJ Beta</h3>
            <p>Master of transitions and experimental sound design.</p>
          </div>
          <div className="dj">
            <h3>DJ Gamma</h3>
            <p>Specializes in remixing popular tracks and blending genres.</p>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="user-reviews">
        <h2>User Reviews</h2>
        <p>Here's what our users have to say about DJ Stream:</p>
        <div className="reviews">
          <div className="review">
            <p>
              "DJ Stream has completely changed the way I create playlists. The
              audio editing tools are amazing!"
            </p>
            <h4>- DJ Max</h4>
          </div>
          <div className="review">
            <p>
              "Being able to pull my Spotify library directly into my playlists
              has saved me so much time."
            </p>
            <h4>- DJ Nova</h4>
          </div>
          <div className="review">
            <p>
              "The YouTube to MP3 feature is a game-changer. Now I can grab any
              track I need on the fly!"
            </p>
            <h4>- DJ Kilo</h4>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
