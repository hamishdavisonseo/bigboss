// lib/cache.ts
import { MongoClient, Collection } from 'mongodb'
import clientPromise from './mongodb'

interface CacheItem {
  key: string
  data: unknown
  expiresAt: Date
  updatedAt: Date
}

export class MongoCache {
  private client: Promise<MongoClient>
  private dbName: string = 'techdirectoryireland'
  private collectionName: string = 'cache'

  constructor() {
    this.client = clientPromise
  }

  private async getCollection(): Promise<Collection<CacheItem>> {
    try {
      const client = await this.client
      const db = client.db(this.dbName)
      const collection = db.collection<CacheItem>(this.collectionName)
      
      // Create TTL index if it doesn't exist
      await collection.createIndex(
        { expiresAt: 1 },
        { expireAfterSeconds: 0, background: true }
      )
      
      return collection
    } catch (error) {
      console.error('Failed to get collection:', error)
      throw error
    }
  }

  async get(key: string): Promise<unknown | null> {
    try {
      console.log('🔍 Checking cache for key:', key)
      const collection = await this.getCollection()
      const item = await collection.findOne({
        key,
        expiresAt: { $gt: new Date() }
      })
      
      if (item) {
        console.log('✅ Cache HIT for:', key)
        return item.data
      }
      
      console.log('❌ Cache MISS for:', key)
      return null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, data: unknown, ttlDays: number = 180): Promise<void> {
    try {
      console.log('💾 Caching data for:', key)
      const collection = await this.getCollection()
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + ttlDays)

      await collection.updateOne(
        { key },
        {
          $set: {
            key,
            data,
            expiresAt,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      )
      console.log('✅ Successfully cached:', key)
    } catch (error) {
      console.error('Cache set error:', error)
      throw error
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const collection = await this.getCollection()
      await collection.deleteOne({ key })
      console.log('🗑️ Deleted cache for:', key)
    } catch (error) {
      console.error('Cache delete error:', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      const collection = await this.getCollection()
      await collection.deleteMany({})
      console.log('🧹 Cleared all cache')
    } catch (error) {
      console.error('Cache clear error:', error)
      throw error
    }
  }
}

export const cache = new MongoCache()