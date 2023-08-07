import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import Contact from "../contacts/contact.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 65 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 50 })
  password: string;

  @Column({ type: "varchar", length: 15 })
  telefone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @OneToMany(() => Contact, (contacts) => contacts.user, {
    nullable: true,
  })
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hashPassword = getRounds(this.password);
    if (!hashPassword) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
