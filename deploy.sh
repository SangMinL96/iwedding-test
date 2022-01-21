#!/bin/bash

blue_port=6801
blue_response=$(curl -s http://localhost:${blue_port}/)
blue_up_count=$(echo $blue_response | grep '아이웨딩' | wc -l)
if [ $blue_up_count -ge 1 ]
then
    TO_PORT=6802
    echo "Start Green"
    docker-compose -f docker-compose-green.yml up -d --build
else
    TO_PORT=6801
    echo "Strart Blue"
    docker-compose -f docker-compose-blue.yml up -d --build
fi


sleep 15
echo "> 15초 후 Health check 시작"
echo "> curl -s http://localhost:$TO_PORT/health "

for retry_count in {1..10}
do
  response=$(curl -s http://localhost:$TO_PORT/)
  up_count=$(echo $response | grep '_next' | wc -l)
  if [ $up_count -ge 1 ]
  then # $up_count >= 1 ("UP" 문자열이 있는지 검증)
      echo "PORT=> ${TO_PORT}"
      echo "> Health check 성공"
      echo "> Port 전환"
      echo "set \$service_url http://127.0.0.1:${TO_PORT};" |sudo tee /etc/nginx/conf.d/iwedding-web-service-url.inc
      echo "> Nginx Reload"
      sudo nginx -s reload

      if [ $blue_up_count -ge 1 ]; then
        echo "${TO_PORT} 그린을 재가동했으므로 블루 닫습니다"
        docker-compose -f docker-compose-blue.yml stop
      else
        echo "${TO_PORT} 블루를 재가동했으므로 Green 닫습니다"
        docker-compose -f docker-compose-green.yml stop
      fi
      break
  else
      echo "> Health check의 응답을 알 수 없거나 혹은 status가 UP이 아닙니다."
      echo "> Health check: ${response}"
  fi

  if [ $retry_count -eq 10 ]
  then
    echo "> Health check 실패. "
    echo "> 배포를 종료합니다."
    exit 1
  fi

  echo "> Health check 연결 실패. 재시도..."
  sleep 10
done
