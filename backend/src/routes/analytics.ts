import express from 'express';
import geoip from 'geoip-lite';

const router = express.Router();

router.post('/collect', (req, res) => {
  // 클라이언트 IP 주소 획득
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress;

  // GeoIP 조회
  const geo = geoip.lookup(ip || '');

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

  res.status(200).json({ status: 'ok' });
});

export default router;
