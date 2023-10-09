import { connectionSource } from '../database/data-source'
import { SocialUser } from '../database/entity/model'
import { SocialMedia } from '../database/entity/model'

export class SocialUserService {
  async deleteContact(socialUserId: number) {
    const socialUserRepository = connectionSource.getRepository(SocialUser)
    const socialMediaRepository = connectionSource.getRepository(SocialMedia)

    console.log(typeof socialUserId)

    const socialUser = await socialUserRepository.findOne({
      where: { id: socialUserId },
    })

    if (!socialUser) {
      throw new Error('Social User not found')
    }

    const socialMedia = socialUser.socialMedia
    console.log(socialMedia)

    await socialUserRepository.remove(socialUser)

    const usersCount = await socialMediaRepository.count({
      where: { id: socialMedia.id },
    })

    if (usersCount === 0) {
      await socialMediaRepository.remove(socialMedia)
    }
  }
}
