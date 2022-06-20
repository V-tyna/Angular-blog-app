export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean
}

export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

export interface FbCreateResponse {
  name: string;
}

export interface Post {
  id?: string;
  title: string;
  author: string;
  textContent: string;
  date: Date;
  name?: string;
}

export interface Comment {
  id?: string;
  author: string;
  comment: string;
  follow: boolean;
  date: Date;
  uid: string;
  postTitle: string;
}
