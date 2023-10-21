import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from './Section';
import { User } from './User';
import { Language } from './Language';

@Index('language_detail_pkey', ['id'], { unique: true })
@Entity('language_detail', { schema: 'public' })
export class LanguageDetail {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @OneToOne(() => Language, (language) => language.name)
  @JoinColumn([{ name: 'language', referencedColumnName: 'id' }])
  language: Language;

  @OneToOne(() => Section, (section) => section)
  @JoinColumn([{ name: 'section_id', referencedColumnName: 'id' }])
  section: Section;

  @OneToOne(() => User, (user) => user.languages)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
