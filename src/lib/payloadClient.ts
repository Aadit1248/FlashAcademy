import { getPayload } from 'payload';
import config from '@/payload/payload.config';

let payload: ReturnType<typeof getPayload> | null = null;

export async function getPayloadInstance() {
  if (!payload) {
    payload = await getPayload({ config }) as any;
  }
  return payload;
}
