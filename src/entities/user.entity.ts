import { Entity, ObjectIdColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  email: string

  @Column()
  userName: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  isBlock: boolean

  @Column()
  createdAt: number

  @Column()
  createdBy: string

  constructor(user: any) {
    if (user) {
      Object.assign(this, user)
    }
  }
}