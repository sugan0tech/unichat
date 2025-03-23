import { Identity } from '@clockworklabs/spacetimedb-sdk';
import { DbConnection, User, Message } from '../module_bindings';

class SpacetimeService {
  private connection: DbConnection | null = null;
  private identity: Identity | null = null;

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection() {
    this.connection = DbConnection.builder()
      .withUri('ws://localhost:3000')
      .withModuleName('unichat')
      .onConnect((conn, identity, token) => {
        this.identity = identity;
        console.log('Connected with identity:', identity.toHexString());
        localStorage.setItem('auth_token', token);
        this.subscribeToTables();
      })
      .onDisconnect((ctx, error) => {
        console.log('Disconnected from SpacetimeDB', error ? `due to error: ${error.message}` : '');
        this.connection = null;
      })
      .onConnectError((ctx, error) => {
        console.error('Connection error:', error);
      })
      .withToken(localStorage.getItem('auth_token') || '')
      .build();
  }

  private subscribeToTables() {
    if (!this.connection) return;

    const queries = ['SELECT * FROM user', 'SELECT * FROM message'];
    let appliedCount = 0;

    const subscriptionBuilder = this.connection.subscriptionBuilder()
      .onApplied(() => {
        appliedCount++;
        if (appliedCount === queries.length) {
          console.log('All subscriptions applied.');
        }
      })
      .onError((errorCtx, error) => {
        console.error('Subscription error:', error);
      });

    queries.forEach(query => subscriptionBuilder.subscribe([query]));

    this.connection.db.message.onInsert((ctx, message) => {
      console.log('New message:', message);
    });

    this.connection.db.message.onDelete((ctx, message) => {
      console.log('Message deleted:', message);
    });
  }

  getIdentity() {
    return this.identity;
  }

  async registerUser(name: string) {
    if (this.connection) {
      this.connection.reducers.registerUser(name);
    }
  }

  async sendMessage(receiver: Identity, content: string) {
    if (this.connection) {
      this.connection.reducers.sendMessage(receiver, content);
    }
  }

  async setName(name: string) {
    if (this.connection) {
      this.connection.reducers.setName(name);
    }
  }

  subscribeToUsers(callback: (users: User[]) => void) {
    if (this.connection) {
      this.connection.db.user.onInsert((_ctx, user) => {
        callback([user]);
      });
      this.connection.db.user.onUpdate((_ctx, _oldUser, newUser) => {
        callback([newUser]);
      });
      this.connection.db.user.onDelete((_ctx, user) => {
        callback([]);
      });
    }
  }

  subscribeToMessages(callback: (messages: Message[]) => void) {
    if (this.connection) {
      this.connection.db.message.onInsert((_ctx, message) => {
        callback([message]);
      });
      this.connection.db.message.onUpdate((_ctx, _oldMessage, newMessage) => {
        callback([newMessage]);
      });
      this.connection.db.message.onDelete((_ctx, message) => {
        callback([]);
      });
    }
  }
}

export const spacetimeService = new SpacetimeService();

