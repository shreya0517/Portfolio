import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPicksRow.css';
import { FaPassport, FaCode, FaBriefcase, FaCertificate, FaHandsHelping, FaProjectDiagram, FaEnvelope, FaMusic, FaBook } from 'react-icons/fa';

type ProfileType = 'recruiter' | 'developer' | 'stalker' | 'adventure';

interface TopPicksRowProps {
  profile: ProfileType;
}

const topPicksConfig = {
  recruiter: [
    { title: "Work Permit", imgSrc: "https://3.files.edl.io/6963/23/05/31/073018-7854d6c3-052c-4737-ba7c-4b56d3012f19.png", icon: <FaPassport />, route: "/work-permit" },
    { title: "Skills", imgSrc: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11346525_p_v8_ac.jpg", icon: <FaCode />, route: "/skills" },
    { title: "Experience", imgSrc: "https://oldaintdead.com/wp-content/uploads/2020/08/theexperience-p-691x1024.jpg", icon: <FaBriefcase />, route: "/work-experience" },
    { title: "Certifications", imgSrc: "https://png.pngtree.com/png-clipart/20230623/original/pngtree-cinema-announcement-certificate-background-hollywood-vector-png-image_9206641.png", icon: <FaCertificate />, route: "/certifications" },
    { title: "Recommendations", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbT4OMzrRe94AZ23Tw9sIXkmkiVIHugHO3Ag&s", icon: <FaHandsHelping />, route: "/recommendations" },
    { title: "Projects", imgSrc: "https://i.ytimg.com/vi/aY3B4u0tFKQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCY4L-wAxkDmhH6lSpDmkpfxBf52A", icon: <FaProjectDiagram />, route: "/projects" },
    { title: "Contact Me", imgSrc: "https://picsum.photos/seed/contact/250/200", icon: <FaEnvelope />, route: "/contact-me" }
  ],
  developer: [
    { title: "Skills", imgSrc: "https://www.heavenofhorror.com/wp-content/uploads/2020/04/code-8-netflix.jpg", route: "/skills", icon: <FaCode /> },
    { title: "Projects", imgSrc: "https://blog.hyperiondev.com/wp-content/uploads/2018/10/Blog-Article-Programming-Projects.jpg", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Certifications", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRumgRPLJmwhaDC8_n_hANbAkOxA5ouiZU8Sg&s", route: "/certifications", icon: <FaCertificate /> },
    { title: "Experience", imgSrc: "https://www.superprof.co.in/blog/wp-content/uploads/2020/12/developing-a-program.png", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Recommendations", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9wDCTPq7Glm9CRVdyNG03pqJFYrSQY4CHA&s", route: "/recommendations", icon: <FaHandsHelping /> },
    { title: "Contact Me", imgSrc: "https://images.stockcake.com/public/b/f/4/bf448e39-6866-4c70-b42c-8c8f3b6cf174_large/coding-on-smartphone-stockcake.jpg", route: "/contact-me", icon: <FaEnvelope /> }
  ],
  stalker: [
    { title: "Recommendations", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbxgEgT11ZfFcKFbqwHPd9pGT5RKaAL85Jrg&s", route: "/recommendations", icon: <FaHandsHelping /> },
    { title: "Contact Me", imgSrc: "https://i.ytimg.com/vi/wBbwireA2Vs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDNhVinBEvH_QMzupqG-ngmUSWOKQ", route: "/contact-me", icon: <FaEnvelope /> },
    { title: "Projects", imgSrc: "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeL3ec0IKv7qQNdCD8Sbbgt28FS5EPUMIIUjG6FuEmpCzEqH8QwU7tvgKHcTZv2xDmSeqRcUwcXM09-UqE5WZmPS_yXRJKYMY6AH.jpg?r=1c4", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Experience", imgSrc: "https://cdn.flickeringmyth.com/wp-content/uploads/2019/04/The-Experience-Official-Trailer-0-11-screenshot.png", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Certifications", imgSrc: "https://static.vecteezy.com/system/resources/thumbnails/007/263/270/small/certificate-cinema-movie-with-gold-line-and-chocolate-color-template-vector.jpg", route: "/certifications", icon: <FaCertificate /> }
  ],
  adventure: [
    { title: "Music", imgSrc: "https://miro.medium.com/1*T2J5AbPL83GhP8D5jldEhQ.jpeg", route: "/music", icon: <FaMusic /> },
    { title: "Projects", imgSrc: "https://picsum.photos/seed/innovation/250/200", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Reading", imgSrc: "https://picsum.photos/seed/books/250/200", route: "/reading", icon: <FaBook /> },
    { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/250/200", route: "/contact-me", icon: <FaEnvelope /> },
    { title: "Certifications", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRumgRPLJmwhaDC8_n_hANbAkOxA5ouiZU8Sg&s", route: "/certifications", icon: <FaCertificate /> }
  ]
};

const TopPicksRow: React.FC<TopPicksRowProps> = ({ profile }) => {
  const navigate = useNavigate();
  const topPicks = topPicksConfig[profile];

  return (
    <div className="top-picks-row">
      <h2 className="row-title">Today's Top Picks for {profile}</h2>
      <div className="card-row">
      {topPicks.map((pick, index) => (
          <div 
            key={index} 
            className="pick-card" 
            onClick={() => navigate(pick.route)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicksRow;

