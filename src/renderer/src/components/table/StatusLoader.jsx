import { useAudioPlayer } from '../../AudioPlayerContext';
import './styles/StatusLoader.css';

const StatusLoader = ({ config }) => {
  console.log('config: ', config);
  const { state, dispatch } = useAudioPlayer();

  return <span className={`${config} ${state.mainTheme}`}></span>;
};

export default StatusLoader;
