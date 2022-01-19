import Loading from '@components/Loading';
import myAxios from '@utils/MyAxios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io(`${process.env.NEXT_PUBLIC_SOKET_URL}`);
function ChatPageIndex() {
  const [roomList, setRoomList] = useState([]);
  const [authKey, setAuthKey] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    user_type: '',
  });

  useEffect(() => {
    socket.on('getMessage:list', data => {
      //console.log(JSON.parse(data));
      console.log(data);
      //console.log("socket: getMessage:list");
      setRoomList(JSON.parse(data));
    });
    socket.on('update:room_row', data => {
      window.location.reload();
    });

    socket.on('join:authkey', data => {
      console.log(data);
      setAuthKey(data.authkey);
    });
  }, []);

  useEffect(() => {
    if (authKey !== null) {
      getUserInfo();
    }
  }, [authKey]);

  const getUserInfo = async () => {
    setUserInfo({
      user_id: 'test1', // purely831@naver.com kin123s@naver.com
      user_type: '0',
    });
    let join_param = {
      user_id: 'test1', // purely831@naver.com kin123s@naver.com
      user_type: '0',
      room_no: '8',
    };

    socket.emit('join:room', join_param, authKey); // 리턴이벤트
    socket.emit('list:room_pt_info', join_param, authKey);
    socket.emit('list:tag', join_param, authKey);
  };
  console.log(roomList);
  if (!roomList) return <Loading />;
  return (
    <div>
      {roomList?.map(item => (
        <div key={item.content}>{item?.content}</div>
      ))}
    </div>
  );
}

export default ChatPageIndex;
