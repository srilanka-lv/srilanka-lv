import { Heading } from '../heading';
import { TripPageExpandable } from '../trip-page-expandable';
import { TripPageHeroSectionCta } from '../trip-page-hero-section-cta';
import {
  tripPagePlanItineraryItemSeparatorStyle,
  tripPagePlanItinerarySectionCtaStyle,
  tripPagePlanItinerarySectionStyle,
  tripPagePlanItinerarySectionWrapperStyle,
  tripPagePlanItineraryStyle,
  tripPageTitleStyle,
} from './styles.css';

export const TripPageItinerarySection = () => (
  <section className={tripPagePlanItinerarySectionStyle}>
    <div>
      <div className={tripPagePlanItinerarySectionWrapperStyle}>
        <Heading as="h3" variant="h3" className={tripPageTitleStyle}>
          Ceļojuma plāns
        </Heading>
        <TripPageHeroSectionCta className={tripPagePlanItinerarySectionCtaStyle} />
      </div>
    </div>
    <div className={tripPagePlanItineraryStyle}>
      <TripPageExpandable
        title="Diena 1"
        subject="Ielidošana in Colombo, iekārtošanās"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-1.webp"
        content={
          <>
            <p>
              Ielidošana. Sagaidīšu jūs lidostā. Pēc nolaišanās ar privātu transportu dosimies uz
              Pinnavalu, kur atrodas Pinnawala Elephant Orphanage – ziloņu patversme, tur iespējams
              redzēt ziloņu ikdienu, tostarp to barošanu un peldes Ma Oya River.
            </p>
            <p>Diena paredzēta mierīga – atpūta pēc lidojuma, pielāgošanās klimatam un laikam.</p>
            <p>Vakarā kopīgas vakariņas, lai iepazītos un pārrunātu turpmāko plānu.</p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 2"
        subject="Suvenīri in Pinnawala, pastaigas un ziloņi"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-2.webp"
        content={
          <>
            <p>
              Dienu pavadīsim mierīgā atmosfērā Pinnavalā. Dosimies uz Pinnawala Elephant Orphanage,
              kur būs iespēja tuvāk iepazīt ziloņus – piedalīties to barošanā, vērot ikdienas aprūpi
              un fotografēties.
            </p>
            <p>
              Brīvajā laikā varēs izstaigāt Pinnavalas tūristu ieliņu, kur pieejami dažādi vietējie
              suvenīri.
            </p>
            <p>
              Pēcpusdienā – atpūta viesnīcā. Būs iespēja pavadīt laiku baseinā ar skatu uz Ma Oya
              River un apkārtnē esošajiem ziloņiem.
            </p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 3"
        subject="Ceļš uz Ellu un tējas plantācijas"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-3.webp"
        content={
          <>
            <p>Rītu sāksim mierīgi. Pēc brokastīm dosimies uz kalnaino pilsētu Ella.</p>
            <p>
              Pa ceļam piestāsim tējas rūpnīcā, kur varēs iepazīt Ceylon tea ražošanas procesu – no
              lapu ievākšanas līdz gatavam dzērienam. Būs iespēja nogaršot tēju un izstaigāt apkārt
              esošās tējas plantācijas.
            </p>
            <p>
              Pēcpusdienā ieradīsimies Ellā. Vakarā – brīvs laiks un mierīga pastaiga pa pilsētu.
            </p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 4"
        subject="Aktīvā diena Ellā"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-4.webp"
        content={
          <>
            <p>
              Rītu sāksim ar braucienu uz slaveno Nine Arches Bridge – vienu no ikoniskākajām vietām
              Šrilankā, kur var vērot vilcienu, kas šķērso iespaidīgo tiltu džungļu un kalnu
              ieskautā vidē.
            </p>
            <p>
              Pēc tam dosimies pārgājienā uz Little Adam’s Peak. Kāpums ir salīdzinoši viegls un
              piemērots lielākajai daļai ceļotāju – taka ir skaidra, ar pakāpieniem, un pārgājiens
              aizņem aptuveni 30–45 minūtes vienā virzienā. Augšā paveras plaši skati uz kalniem un
              tējas plantācijām, kas ir viens no galvenajiem iemesliem, kāpēc šī vieta ir tik
              iecienīta.
            </p>
            <p>Būs iespēja arī izbaudīt zipline braucienu pāri kalnu ainavām.</p>
            <p>
              Vakaru pavadīsim kādā no Little Adam’s Peak apkārtnes kafejnīcām ar panorāmas skatu.
              Būs iespēja atpūsties, nopeldēties baseinā un mierīgi izbaudīt vakaru.
            </p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 5"
        subject="Ceļš uz Udawalawe"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-5.webp"
        content={
          <>
            <p>
              Diena paredzēta pārbraucienam. No rīta nesteidzīgi izbrauksim no Ella un dosimies uz
              Udawalawe National Park.
            </p>
            <p>
              Pa ceļam piestāsim pie Secret Waterfall, kur būs iespēja īsi atpūsties, nopeldēties un
              apskatīt dabas ainavu.
            </p>
            <p>Pēcpusdienā ieradīsimies Udawalawe apkārtnē un iekārtosimies naktsmītnē.</p>
            <p>Nākamajā rītā agri dosimies safari braucienā pa nacionālo parku.</p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 6"
        subject="Safari un ceļš uz Madiha"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-6.webp"
        content={
          <>
            <p>
              Rītu sāksim agri ar saullēktu un dosimies safari braucienā pa Udawalawe National Park
              ar privātu džipu. Tūre ilgst aptuveni 3–4 stundas. Safari laikā iespējams redzēt
              ziloņus, ūdens bifeļus, briežus, pērtiķus, krokodilus un dažādas putnu sugas.
            </p>
            <p>Pēc safari dosimies tālāk uz Madiha.</p>
            <p>
              Pa ceļam piestāsim pie Mulkirigala Rock Temple – iespaidīga akmens tempļa. Tur būs
              iespēja iepazīt Šrilankas budismu, apskatīt Budas statujas un izbaudīt skatus no
              augšas.
            </p>
            <p>Vakarā ieradīsimies Madihā un mierīgi pavadīsim vakaru pie okeāna.</p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 7"
        subject="Atpūta Mirissa pludmalē"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-7.webp"
        content={
          <>
            <p>
              Dienu pavadīsim Mirissa – vienā no skaistākajām Šrilankas pludmalēm. Tā būs brīva un
              mierīga diena atpūtai.
            </p>
            <p>
              Peldēsimies, sauļosimies, apmeklēsim Parrot Rock un Coconut Tree Hill – vienu no
              populārākajām fotografēšanās vietām ar skatu uz okeānu.
            </p>
            <p>
              Būs iespēja arī nogaršot svaigus kokosriekstus un izbaudīt dienvidu piekrastes
              atmosfēru.
            </p>
            <p>Mierīga diena, baudot sauli un atpūtu pie okeāna.</p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 8"
        subject="Okeāns un gredzenu meistarklase"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-8.webp"
        content={
          <>
            <p>
              No rīta dosimies snorkelēt okeānā, kur būs iespējams redzēt jūras bruņurupučus to
              dabiskajā vidē.
            </p>
            <p>
              Pēc tam dosimies uz gredzenu veidošanas meistarklasi, kur katra varēs izgatavot savu
              gredzenu ar vietējiem Šrilankas akmeņiem.
            </p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 9"
        subject="Atpūta un aktivitātes pie okeāna"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-9.webp"
        content={
          <>
            <p>Rīts pie okeāna – brīvs laiks atpūtai.</p>
            <p>
              Pēc vēlmes būs iespēja apmeklēt jogas nodarbību vai izmēģināt sērfošanu ar vietējiem
              instruktoriem. Vakarā dosimies izbraucienā pa upi, kur iespējams redzēt krokodilus un
              citus dzīvniekus.
            </p>
            <p>Mierīgs dienas noslēgums uz upes.</p>
          </>
        }
      />
      <hr className={tripPagePlanItineraryItemSeparatorStyle} />
      <TripPageExpandable
        title="Diena 10"
        subject="Brauksim atpakaļ uz Kolombo lidostu, uz lidojums mājās"
        imageSrc="/images/srilanka-lv_10-dienu-celojums_diena-10.webp"
        content={<span>Brauksim atpakaļ uz Kolombo lidostu, un lidojums mājās.</span>}
      />
    </div>
  </section>
);
