export  type Product = {
  id: number
  name: string
  prix: number
  description: string
  Category: {
    name: string
  } | null
  images: {
    url: string
  }[]
}

export default interface User {
  name: string;
  email: string;
  profileImage?: string; // optionnel si tu veux permettre son absence
}