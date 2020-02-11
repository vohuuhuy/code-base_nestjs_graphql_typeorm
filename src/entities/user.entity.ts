import { Entity, ObjectIdColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: string

  @Column()
  imageUrl: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column()
  profileId: string

  @Column()
  retainId: string

  @Column()
  idDoctor: string

  @Column()
  isEnabled: boolean

  @Column()
  sessionId: string

  @Column()
  createdAt: number

  @Column()
  updatedAt: number

  constructor(user: any) {
    if (user) {
      Object.assign(this, user)
    }
  }
}