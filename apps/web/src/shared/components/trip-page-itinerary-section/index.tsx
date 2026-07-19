import Image from 'next/image';

import { TripPageExpandable } from '../trip-page-expandable';
import {
  tripPagePlanItineraryItemSeparatorStyle,
  tripPagePlanItinerarySectionMapImageStyle,
  tripPagePlanItinerarySectionMapStyle,
  tripPagePlanItinerarySectionStyle,
  tripPagePlanItineraryStyle,
} from './styles.css';

export const TripPageItinerarySection = () => (
  <section className={tripPagePlanItinerarySectionStyle}>
    <span className={tripPagePlanItinerarySectionMapStyle}>
      <Image
        className={tripPagePlanItinerarySectionMapImageStyle}
        src="/images/srilanka-lv_10-dienu-celojums_v2.gif"
        alt="Karte ar mūsu ceļojuma uz Šrilanku spilgtākajiem notikumiem"
        sizes="auto"
        quality={75}
        width={405}
        height={405}
        objectFit="cover"
        objectPosition="center"
      />
    </span>
    <div className={tripPagePlanItineraryStyle}>
      <TripPageExpandable
        title="Diena 1"
        subject="Ielidošana in Colombo, iekārtošanās"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-1.webp"
        content={
          <span>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 2"
        subject="Suvenīri in Pinnawala, pastaigas un ziloņi"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-2.webp"
        content={
          <span>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 3"
        subject="Ceļš uz Ellu un tējas plantācijas"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-3.webp"
        content={
          <span>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 4"
        subject="Aktīvā diena Ellā"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-4.webp"
        content={
          <span>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 5"
        subject="Ceļš uz Udawalawe"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-5.webp"
        content={
          <span>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 6"
        subject="Safari un ceļš uz Madiha"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-6.webp"
        content={
          <span>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 7"
        subject="Atpūta Mirissa pludmalē"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-7.webp"
        content={
          <span>
            Dienu pavadīsim Mirissa – vienā no skaistākajām Šrilankas pludmalēm. Tā būs brīva un
            mierīga diena atpūtai. Peldēsimies, sauļosimies, apmeklēsim Parrot Rock un Coconut Tree
            Hill – vienu no populārākajām fotografēšanās vietām ar skatu uz okeānu. Būs iespēja arī
            nogaršot svaigus kokosriekstus un izbaudīt dienvidu piekrastes atmosfēru. Mierīga diena,
            baudot sauli un atpūtu pie okeāna.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 8"
        subject="Okeāns un gredzenu meistarklase"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-8.webp"
        content={
          <span>
            No rīta dosimies snorkelēt okeānā, kur būs iespējams redzēt jūras bruņurupučus to
            dabiskajā vidē. Pēc tam dosimies uz gredzenu veidošanas meistarklasi, kur katra varēs
            izgatavot savu gredzenu ar vietējiem Šrilankas akmeņiem.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 9"
        subject="Atpūta un aktivitātes pie okeāna"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-9.webp"
        content={
          <span>
            Rīts pie okeāna – brīvs laiks atpūtai. Pēc vēlmes būs iespēja apmeklēt jogas nodarbību
            vai izmēģināt sērfošanu ar vietējiem instruktoriem. Vakarā dosimies izbraucienā pa upi,
            kur iespējams redzēt krokodilus un citus dzīvniekus. Mierīgs dienas noslēgums uz upes.
          </span>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 10"
        subject="Brauksim atpakaļ uz Kolombo lidostu, uz lidojums mājās"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-10.webp"
        content={
          <span>
            Rīts pie okeāna – brīvs laiks atpūtai. Pēc vēlmes būs iespēja apmeklēt jogas nodarbību
            vai izmēģināt sērfošanu ar vietējiem instruktoriem. Vakarā dosimies izbraucienā pa upi,
            kur iespējams redzēt krokodilus un citus dzīvniekus. Mierīgs dienas noslēgums uz upes.
          </span>
        }
      />
    </div>
  </section>
);
