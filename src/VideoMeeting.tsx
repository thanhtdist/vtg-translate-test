import React, { useEffect } from 'react';
import './App.css';
import {
  useLocalVideo,
  VideoTileGrid,
  useMeetingStatus,
  MeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import '@aws-amplify/ui-react/styles.css';
import '@cloudscape-design/global-styles/index.css';
import {tVideoMeeting} from "./types";

const VideoMeeting = (props: tVideoMeeting) => {
  const { setLine, setTranscribeStatus, setTranslateStatus } = props;
  const meetingStatus = useMeetingStatus();
  const { toggleVideo } = useLocalVideo();

  useEffect(() => {
    async function tog() {
      if (meetingStatus === MeetingStatus.Succeeded) {
        await toggleVideo();
      }
      if (meetingStatus === MeetingStatus.Ended) {
        setLine([]);
        setTranscribeStatus(false);
        setTranslateStatus(false);
      }
    }
    tog();
  }, [meetingStatus]);

  return (
    <div style={{ height: '600px', width: '720px' }}>
      <VideoTileGrid />
    </div>
  );
};

export default VideoMeeting;
