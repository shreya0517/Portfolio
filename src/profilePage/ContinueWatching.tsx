import React from 'react';
import { Link } from 'react-router-dom';
import './ContinueWatching.css';

type ProfileType = 'recruiter' | 'developer' | 'stalker' | 'adventure';

interface ContinueWatchingProps {
  profile: ProfileType;
}

const continueWatchingConfig = {
  recruiter: [
    { title: "Music", imgSrc: "https://www.pianoemporium.com/wp-content/uploads/2019/03/music-keyboard-technology-guitar-concert-piano-1108329-pxhere.com_-800x600.jpg", link: "/music" },
    { title: "Reading", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgC410tdl_4oMRUrWs59l4MGXm0-XgCd8I4A&s", link: "/reading" },
    { title: "Blogs", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShl0N2bU5dVImcpu2IT01loXa9qldF6QmXsg&s", link: "/blogs" },
    { title: "Contact Me", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxldEbShOuEjDeLckSfZ0--_FsiHyKmjXxw&s", link: "/contact-me" }
  ],
  developer: [
    { title: "Music", imgSrc: "https://picsum.photos/id/1025/300/200", link: "/music" },
    { title: "Reading", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgC410tdl_4oMRUrWs59l4MGXm0-XgCd8I4A&s", link: "/reading" },
    { title: "Blogs", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShl0N2bU5dVImcpu2IT01loXa9qldF6QmXsg&s", link: "/blogs" },
    { title: "Certifications", imgSrc: "https://picsum.photos/id/1028/300/200", link: "/certifications" },
    { title: "Contact Me", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxldEbShOuEjDeLckSfZ0--_FsiHyKmjXxw&s", link: "/contact-me" }
  ],
  stalker: [
    { title: "Reading", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgC410tdl_4oMRUrWs59l4MGXm0-XgCd8I4A&s", link: "/reading" },
    { title: "Blogs", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShl0N2bU5dVImcpu2IT01loXa9qldF6QmXsg&s", link: "/blogs" },
    { title: "Contact Me", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxldEbShOuEjDeLckSfZ0--_FsiHyKmjXxw&s", link: "/contact-me" }
  ],
  adventure: [
    { title: "Music", imgSrc: "https://picsum.photos/id/1025/300/200", link: "/music" },
    { title: "Reading", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgC410tdl_4oMRUrWs59l4MGXm0-XgCd8I4A&s", link: "/reading" },
    { title: "Certifications", imgSrc: "https://picsum.photos/id/1028/300/200", link: "/certifications" },
    { title: "Contact Me", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxldEbShOuEjDeLckSfZ0--_FsiHyKmjXxw&s", link: "/contact-me" }
  ]
};

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ profile }) => {
  const continueWatching = continueWatchingConfig[profile];

  return (
    <div className="continue-watching-row">
      <h2 className="row-title">Continue Watching for {profile}</h2>
      <div className="card-row">
        {continueWatching.map((pick, index) => (
          <Link to={pick.link} key={index} className="pick-card">
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;

