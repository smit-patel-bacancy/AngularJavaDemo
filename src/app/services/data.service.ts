import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root' // Singleton service - one instance for entire app
})
export class DataService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
  ];

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics' },
    { id: 3, name: 'Keyboard', price: 59.99, category: 'Electronics' }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  public users$ = this.usersSubject.asObservable();
  public products$ = this.productsSubject.asObservable();

  private serviceInstanceId: string;

  constructor() {
    // Generate unique instance ID to demonstrate service instances
    this.serviceInstanceId = Math.random().toString(36).substr(2, 9);
    console.log(`DataService instance created with ID: ${this.serviceInstanceId}`);
  }

  // Get service instance ID
  public getInstanceId(): string {
    return this.serviceInstanceId;
  }

  // User operations
  public getUsers(): User[] {
    return [...this.users];
  }

  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: Math.max(...this.users.map(u => u.id)) + 1
    };
    this.users.push(newUser);
    this.usersSubject.next([...this.users]);
    return newUser;
  }

  public updateUser(id: number, updates: Partial<User>): User | null {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      this.usersSubject.next([...this.users]);
      return this.users[index];
    }
    return null;
  }

  public deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersSubject.next([...this.users]);
      return true;
    }
    return false;
  }

  // Product operations
  public getProducts(): Product[] {
    return [...this.products];
  }

  public getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  public addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: Math.max(...this.products.map(p => p.id)) + 1
    };
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
    return newProduct;
  }

  public updateProduct(id: number, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      this.productsSubject.next([...this.products]);
      return this.products[index];
    }
    return null;
  }

  public deleteProduct(id: number): boolean {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsSubject.next([...this.products]);
      return true;
    }
    return false;
  }

  // Search functionality
  public searchUsers(query: string): User[] {
    const lowerQuery = query.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
    );
  }

  public searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Statistics
  public getUserCount(): number {
    return this.users.length;
  }

  public getProductCount(): number {
    return this.products.length;
  }

  public getAverageProductPrice(): number {
    if (this.products.length === 0) return 0;
    const total = this.products.reduce((sum, product) => sum + product.price, 0);
    return total / this.products.length;
  }

  // Service lifecycle demonstration
  public logServiceAction(action: string): void {
    console.log(`[DataService ${this.serviceInstanceId}] ${action}`);
  }
}
