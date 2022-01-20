import { Desktop } from '@hooks/useDevice';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const NotificationCenterReplace = dynamic(() => import('@components/header_footer/NotificationCenterReplace'), { ssr: false });

const Alarm = () => {
  //
  const isDeskTop = Desktop();
  const router = useRouter();
  const closeNoti = () => {
    router.push('/main/index');
  };
  return <NotificationCenterReplace isNotiOpen fullSize={!isDeskTop} closeNoti={closeNoti} />;
};

export default Alarm;
