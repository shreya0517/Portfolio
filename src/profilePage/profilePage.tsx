import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProfilePage.css';

import ProfileBanner from './ProfileBanner';
import TopPicksRow from './TopPicksRow';
import ContinueWatching from './ContinueWatching';
import recruiterVideo from '../images/videos/recruiter.mp4';
import developerVideo from '../images/videos/developer.mp4';
import adventurerVideo from '../images/videos/adventurer.mp4';
import stalkerVideo from '../images/videos/stalker.mp4';

type ProfileType = 'recruiter' | 'developer' | 'stalker' | 'adventure';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { profileName } = useParams<{ profileName: string }>();

  const profile = ['recruiter', 'developer', 'stalker', 'adventure'].includes(profileName!)
    ? (profileName as ProfileType)
    : 'recruiter';
  const backgroundGif = location.state?.backgroundGif || "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif";
  
  let videoSrc: string | undefined;
    switch (profile) {
    case 'recruiter':
      videoSrc = recruiterVideo;
      break;
    case 'developer':
      videoSrc = developerVideo;
      break;
    case 'stalker':
      videoSrc = stalkerVideo;
      break;
    case 'adventure':
      videoSrc = adventurerVideo;
      break;
    default:
      videoSrc = undefined;
  }
  const useVideo = !!videoSrc;

  return (
    <>
      <div
        className="profile-page"
        style={useVideo ? undefined : { backgroundImage: `url(${backgroundGif})` }}
      >
        {useVideo && videoSrc && (
          <video className="profile-page-video" autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        <ProfileBanner />
      </div>
      <TopPicksRow profile={profile} />
      <ContinueWatching profile={profile} />
    </>
  );
};

export default ProfilePage;

