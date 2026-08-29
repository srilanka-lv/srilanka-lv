import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Signature } from '@/shared/components/signature';
import { WHATSAPP_URL } from '@/shared/constants/whatsapp';

import {
  storyClosingStyle,
  storyParagraphStyle,
  storyPhotoBreakImageStyle,
  storyPhotoBreakLineStyle,
  storyPhotoBreakStyle,
  storySectionStyle,
  storySignatureStyle,
  storySignatureWrapperStyle,
  storyTurnLineStyle,
} from './styles.css';

export const AboutPageStorySection: FunctionComponent = () => (
  <section className={storySectionStyle}>
    <p className={storyParagraphStyle}>
      Grūti noticēt, bet viss sākās pavisam nejauši. 2022. gada ziemā Google meklēju atbildi uz
      vienu vienkāršu jautājumu, kur janvārī doties sērfot? Tā mana dzīve mani aizveda uz Šrilanku.
      Plāns bija pavadīt šeit piecus mēnešus. Es vēl nenojautu, ka šis ceļojums mainīs visu manu
      dzīvi.
    </p>
    <h2 className={storyTurnLineStyle}>
      Godīgi sakot, pirmā tikšanās ar Šrilanku nebija mīlestība no pirmā acu skatiena.
    </h2>
    <p className={storyParagraphStyle}>
      Tas bija īsts kultūršoks. Haotiska satiksme, skaļas ielas, pavisam cita kultūra, cilvēki, kuri
      nepārtraukti gribēja uzsākt sarunu, un vide, kas šķita tik atšķirīga no Eiropas. Es nesapratu,
      kas notiek un ko visi no manis vēlas.
    </p>
    <div className={storyPhotoBreakStyle}>
      <Image
        className={storyPhotoBreakImageStyle}
        src="/images/srilanka-lv_meitenu-celojums_motorolleru-piedzinas.webp"
        alt="Grieta ar motorolleru Šrilankas zvejnieku ostā"
        fill
        sizes="100vw"
        quality={75}
      />
      <h2 className={storyPhotoBreakLineStyle}>Taču tieši tas mani aizrāva.</h2>
    </div>
    <p className={storyParagraphStyle}>
      Aiz pirmā iespaida slēpās pavisam cita pasaule. Jo ilgāk šeit dzīvoju, jo vairāk ieraudzīju
      to, ko tūristi bieži nepamana, cilvēku sirsnību, bagāto kultūru, nesteidzīgo dzīves ritmu un
      sajūtu, ka laimei patiesībā nevajag nemaz tik daudz.
    </p>
    <p className={storyParagraphStyle}>
      Pēc pirmā ceļojuma es atgriezos Šrilankā atkal un atkal. Katru gadu pavadīju šeit vismaz
      piecus vai sešus mēnešus, līdz beidzot sapratu, ka šī vieta ir kļuvusi par manām mājām.
    </p>
    <div className={storyPhotoBreakStyle}>
      <Image
        className={storyPhotoBreakImageStyle}
        src="/images/srilanka-lv_meitenu-celojums_srilankas-kalni.webp"
        alt="Grieta saullēktā Šrilankas kalnos"
        fill
        sizes="100vw"
        quality={75}
      />
      <h2 className={storyPhotoBreakLineStyle}>Un pat tagad Šrilanka mani turpina pārsteigt.</h2>
    </div>
    <p className={storyParagraphStyle}>
      Te ir viss: džungļi, kalni, ūdenskritumi, zelta pludmales, silts Indijas okeāns, +30°C gandrīz
      visu gadu, tropiskie augļi, savvaļas ziloņi, safari un simtiem vietu, kurās joprojām neesmu
      bijusi. Šī sala nekad nebeidz atklāt kaut ko jaunu.
    </p>
    <h2 className={storyTurnLineStyle}>
      Tomēr vislielākās pārmaiņas nenotika apkārt man, tās notika manī.
    </h2>
    <p className={storyParagraphStyle}>
      Šrilanka iemācīja man izkāpt ārpus komforta zonas, uzticēties sev, palaist vaļā vēlmi visu
      kontrolēt un ar ziņkāri pieņemt nezināmo. Tā parādīja, cik viegli ir veidot patiesas
      attiecības ar vietējiem cilvēkiem pat tad, ja nerunā viņu valodā. Un cik daudz dzīvē iespējams
      iegūt, vienkārši pasakot "jā" jaunai pieredzei.
    </p>
    <h2 className={storyTurnLineStyle}>Protams, mans ceļš nebija bez kļūdām.</h2>
    <p className={storyParagraphStyle}>
      Es izvēlējos neveiksmīgas naktsmītnes, plānoju neefektīvus maršrutus, pārmaksāju par
      pakalpojumiem un vairākas reizes mācījos tikai no savas pieredzes. Taču tieši šīs kļūdas man
      deva zināšanas, kuras šodien palīdz citiem ceļot gudrāk.
    </p>
    <div className={storyPhotoBreakStyle}>
      <Image
        className={storyPhotoBreakImageStyle}
        src="/images/srilanka-lv_meitenu-celojums_saulrieta-serfosana.webp"
        alt="Sērfošana ar meitenēm Šrilankā"
        fill
        sizes="100vw"
        quality={75}
      />
      <h2 className={storyPhotoBreakLineStyle}>Tieši tāpēc radās srilanka.lv</h2>
    </div>
    <p className={storyParagraphStyle}>
      Es vēlos, lai citiem nebūtu jāiziet cauri visām tām pašām kļūdām. Lai ceļojums uz Šrilanku
      būtu nevis pilns ar stresu un neziņu, bet gan piepildīts ar skaistākajiem piedzīvojumiem.
    </p>
    <p className={storyParagraphStyle}>
      Šodien es palīdzu latviešiem iepazīt Šrilanku tādu, kādu to pazīstu es, īstu, autentisku un
      drošu. Veidoju{' '}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="contact"
        data-umami-event-channel="whatsapp"
      >
        personalizētus ceļojumu plānus
      </a>
      , organizēju{' '}
      <Link href={`/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`}>grupu braucienus</Link>{' '}
      un sniedzu reālu atbalstu uz vietas, lai ikviens varētu izbaudīt šo salu ar pārliecību un
      mieru.
    </p>
    <h2 className={storyTurnLineStyle}>Es neesmu tikai ceļojumu plānotāja.</h2>
    <p className={storyParagraphStyle}>
      Es esmu cilvēks, kurš pats reiz ieradās šeit pilnīgā neziņā un soli pa solim iemācījās iemīlēt
      šo valsti. Tagad mans lielākais prieks ir palīdzēt arī citiem piedzīvot savu īpašo Šrilankas
      stāstu.
    </p>
    <p className={storyClosingStyle}>
      Varbūt arī Tavējais sāksies pavisam nejauši. Tieši tāpat kā reiz sākās manējais.
    </p>
    <div className={storySignatureWrapperStyle}>
      <Signature className={storySignatureStyle} />
    </div>
  </section>
);
