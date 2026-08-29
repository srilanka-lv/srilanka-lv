import Image from 'next/image';

import { Heading } from '@/shared/components/heading';
import { Signature } from '@/shared/components/signature';
import { Text } from '@/shared/components/text';
import { WhatsAppButton } from '@/shared/components/whatsapp-button';

import {
  footerHeadingStyle,
  footerProfilePictureStyle,
  footerProfileStyle,
  footerSignatureStyle,
  footerTextStyle,
  whatsAppLinkStyle,
} from '../footer/styles.css';

export const FooterAboutMe = () => (
  <div>
    <Heading as="h2" variant="h6" className={footerHeadingStyle}>
      Čau! Esmu Grieta.
    </Heading>
    <Text className={footerTextStyle}>
      Jau vairāk nekā četrus gadus dzīvoju Šrilankā. Kad pirmo reizi ierados, pieļāvu daudz kļūdu.
      No nepareiziem maršrutiem līdz neveiksmīgām naktsmītnēm. Tieši tā es iemācījos, kā ceļot šeit
      gudri un droši.
    </Text>
    <Text className={footerTextStyle}>
      Ar laiku Šrilanka man kļuva par īpašu vietu. Tās daba, cilvēki un dzīves ritms lika saprast,
      ka šeit jūtos kā mājās.
    </Text>
    <Text className={footerTextStyle}>
      Tagad es palīdzu arī citiem latviešiem piedzīvot šo valsti bez lieka stresa ar personalizētiem
      ceļojumiem, grupu braucieniem un reālu atbalstu uz vietas.
    </Text>
    <div className={footerProfileStyle}>
      <Image
        className={footerProfilePictureStyle}
        src="/images/srilanka-lv_laura-grieta-grinberga_profile.webp"
        alt="Grieta - Srilanka.lv"
        width={60}
        height={60}
      />
      <Signature className={footerSignatureStyle} />
    </div>
    <WhatsAppButton className={whatsAppLinkStyle} />
  </div>
);
