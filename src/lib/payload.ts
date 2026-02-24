import { getPayloadInstance } from './payloadClient';
import type { Config } from 'payload';

// Import from generated types or use dynamic typing
let payloadTypes: any;

type CollectionSlug = 'users' | 'locations' | 'services' | 'players' | 'events' | 'booked-slots';

// ============ GENERIC CRUD OPERATIONS ============

export async function createDocument<T extends CollectionSlug>(
  collection: T,
  data: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const payload: any = await getPayloadInstance();
  try {
    const result = await payload.create({
      collection: collection as any,
      data,
    });
    return result;
  } catch (error) {
    console.error(`Error creating ${collection}:`, error);
    throw error;
  }
}

export async function getDocuments<T extends CollectionSlug>(
  collection: T,
  options?: {
    limit?: number;
    page?: number;
    where?: Record<string, unknown>;
    sort?: string;
  },
) {
  const payload: any = await getPayloadInstance();
  try {
    const result = await payload.find({
      collection: collection as any,
      limit: options?.limit || 10,
      page: options?.page || 1,
      where: options?.where,
      sort: options?.sort,
    });
    return result;
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    throw error;
  }
}

export async function getDocumentById<T extends CollectionSlug>(
  collection: T,
  id: string,
) {
  const payload: any = await getPayloadInstance();
  try {
    const result = await payload.findByID({
      collection: collection as any,
      id,
    });
    return result;
  } catch (error) {
    console.error(`Error fetching ${collection} by ID:`, error);
    throw error;
  }
}

export async function updateDocument<T extends CollectionSlug>(
  collection: T,
  id: string,
  data: Record<string, unknown>,
) {
  const payload: any = await getPayloadInstance();
  try {
    const result = await payload.update({
      collection: collection as any,
      id,
      data,
    });
    return result;
  } catch (error) {
    console.error(`Error updating ${collection}:`, error);
    throw error;
  }
}

export async function deleteDocument<T extends CollectionSlug>(
  collection: T,
  id: string,
) {
  const payload: any = await getPayloadInstance();
  try {
    const result = await payload.delete({
      collection: collection as any,
      id,
    });
    return result;
  } catch (error) {
    console.error(`Error deleting from ${collection}:`, error);
    throw error;
  }
}

// ============ COLLECTION-SPECIFIC OPERATIONS ============

// USERS
export async function createUser(data: Record<string, unknown>) {
  return createDocument('users', data);
}

export async function getUsers(options?: { limit?: number; page?: number }) {
  return getDocuments('users', options);
}

export async function getUserById(id: string) {
  return getDocumentById('users', id);
}

export async function updateUser(id: string, data: Record<string, unknown>) {
  return updateDocument('users', id, data);
}

export async function deleteUser(id: string) {
  return deleteDocument('users', id);
}

// LOCATIONS
export async function createLocation(data: Record<string, unknown>) {
  return createDocument('locations', data);
}

export async function getLocations(options?: { limit?: number; page?: number }) {
  return getDocuments('locations', options);
}

export async function getLocationById(id: string) {
  return getDocumentById('locations', id);
}

export async function updateLocation(id: string, data: Record<string, unknown>) {
  return updateDocument('locations', id, data);
}

export async function deleteLocation(id: string) {
  return deleteDocument('locations', id);
}

// SERVICES
export async function createService(data: Record<string, unknown>) {
  return createDocument('services', data);
}

export async function getServices(options?: { limit?: number; page?: number }) {
  return getDocuments('services', options);
}

export async function getServiceById(id: string) {
  return getDocumentById('services', id);
}

export async function updateService(id: string, data: Record<string, unknown>) {
  return updateDocument('services', id, data);
}

export async function deleteService(id: string) {
  return deleteDocument('services', id);
}

// PLAYERS
export async function createPlayer(data: Record<string, unknown>) {
  return createDocument('players', data);
}

export async function getPlayers(options?: { limit?: number; page?: number }) {
  return getDocuments('players', options);
}

export async function getPlayerById(id: string) {
  return getDocumentById('players', id);
}

export async function updatePlayer(id: string, data: Record<string, unknown>) {
  return updateDocument('players', id, data);
}

export async function deletePlayer(id: string) {
  return deleteDocument('players', id);
}

// EVENTS
export async function createEvent(data: Record<string, unknown>) {
  return createDocument('events', data);
}

export async function getEvents(options?: { limit?: number; page?: number }) {
  return getDocuments('events', options);
}

export async function getEventById(id: string) {
  return getDocumentById('events', id);
}

export async function updateEvent(id: string, data: Record<string, unknown>) {
  return updateDocument('events', id, data);
}

export async function deleteEvent(id: string) {
  return deleteDocument('events', id);
}

// BOOKED SLOTS
export async function createBookedSlot(data: Record<string, unknown>) {
  return createDocument('booked-slots', data);
}

export async function getBookedSlots(options?: { limit?: number; page?: number }) {
  return getDocuments('booked-slots', options);
}

export async function getBookedSlotById(id: string) {
  return getDocumentById('booked-slots', id);
}

export async function updateBookedSlot(id: string, data: Record<string, unknown>) {
  return updateDocument('booked-slots', id, data);
}

export async function deleteBookedSlot(id: string) {
  return deleteDocument('booked-slots', id);
}
