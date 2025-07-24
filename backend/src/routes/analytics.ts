import express from 'express';
import geoip from 'geoip-lite';

const router = express.Router();

router.post('/collect', (req, res) => {
  console.log('🎯 [Analytics] 요청 수신됨!');
  console.log('🎯 [Analytics] Headers:', req.headers);
  console.log('🎯 [Analytics] Body:', req.body);

  // 클라이언트 IP 주소 획득
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress;

  console.log('🔍 [DEBUG] 클라이언트 IP:', ip);
  console.log('🔍 [DEBUG] x-forwarded-for 헤더:', req.headers['x-forwarded-for']);
  console.log('🔍 [DEBUG] socket.remoteAddress:', req.socket.remoteAddress);

  // GeoIP 조회
  const geo = geoip.lookup(ip || '');
  console.log('🔍 [DEBUG] geoip.lookup 결과:', geo);

  // 실제 공인 IP로 테스트
  const testGeo = geoip.lookup('1.238.129.195'); // 수원 IP
  console.log('🔍 [DEBUG] 수원 IP (1.238.129.195) 지오:', testGeo);

  // 요청 body와 Geo 정보 병합
  const enrichedEvent = {
    ...req.body,
    context: {
      ...req.body.context,
      geo: {
        ...req.body.context?.geo,
        ip: ip || null,
        country: geo?.country || null,
        city: geo?.city || null,
        region: geo?.region || null,
      },
    },
  };

  // 예시: 콘솔에 출력 (원한다면 DB 저장 등 가능)
  console.log('📩 수신된 클릭스트림 이벤트:', enrichedEvent);

  res.status(200).json({ status: 'ok', message: 'Analytics data received' });
});

export default router;
