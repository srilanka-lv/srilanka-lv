import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildItems } from '@/shared/components/breadcrumbs/build-items';

import { Heading } from '../heading';
import { TripPageExpandable } from '../trip-page-expandable';
import {
  tripPageHeroSectionDescriptionParagraphStyle,
  tripPageHeroSectionDescriptionStyle,
  tripPageHeroSectionStyle,
  tripPageImageGalleryMainImageStyle,
  tripPageImageGalleryStyle,
  tripPageImageGalleryThumbnailImageStyle,
  tripPageImageGalleryThumbnailsContainerStyle,
  tripPagePlanItineraryItemSeparatorStyle,
  tripPagePlanItinerarySectionMapStyle,
  tripPagePlanItinerarySectionStyle,
  tripPagePlanItineraryStyle,
  tripPageSummaryItemSeparatorStyle,
  tripPageSummaryItemStyle,
  tripPageSummaryItemTitleStyle,
  tripPageSummaryItemValueListItemExcludedStyle,
  tripPageSummaryItemValueListItemIncludedStyle,
  tripPageSummaryItemValueListStyle,
  tripPageSummaryItemValueStyle,
  tripPageSummaryStyle,
  tripPageTitleStyle,
  tripPageUspItemListStyle,
  tripPageUspSectionStyle,
  tripPageUspTitleStyle,
} from './styles.css';

export const ProductPageTrip: FunctionComponent = () => {
  const productsHref = `/${PAGES.LV.PRODUCTS}`;

  return (
    <>
      <Breadcrumbs
        items={buildItems(productsHref, {
          name: '10 dienu ceļojums Šrilankā (tikai meitenēm)',
          href: `${productsHref}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
        })}
      />
      <Heading as="h1" variant="h1" className={tripPageTitleStyle}>
        10 dienu ceļojums Šrilankā tikai meitenēm (2027)
      </Heading>
      <section className={tripPageHeroSectionStyle}>
        <div className={tripPageImageGalleryStyle}>
          <span className={tripPageImageGalleryMainImageStyle}>
            <Image
              src="/images/srilanka-lv_10-dienu-celojums_apmeklejot-udenskritumu.webp"
              alt="Laura Grieta no srilanka.lv apmeklē ūdenskritumu Šrilankā"
              fill
              sizes="auto"
              priority
              quality={75}
            />
          </span>
          <span className={tripPageImageGalleryThumbnailsContainerStyle}>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_10-dienu-celojums_latviesu-meitenu-grupa-atpusas-pie-baseina-srilanka.webp"
                alt="Latviešu meiteņu grupa atpūšas pie baseina Šrilankā"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_10-dienu-celojums_rita-joga-srilankas-tropiskaja-atmosfera.webp"
                alt="Rīta joga Šrilankas tropiskajā atmosfērā"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_saulrieta-serfosana.webp"
                alt="Sērfošana ar meitenēm Šrilankā"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_10-dienu-celojums_atputa-pludmale-ar-zilam-debesim-un-skaistu-apkartni.webp"
                alt="Atpūta pludmalē ar zilām debesīm un skaistu apkārtni"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_srilankas-okeans.webp"
                alt="Zilais, tropiskais okeāns Šrilankā"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>

            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_10-dienu-celojums_izbaudiet-serfosanu-smiltis-starp-kaju-pirkstiem-un-tropiskos-kokosriekstus.webp"
                alt="Izbaudiet sērfošanu, smiltis starp kāju pirkstiem un tropiskos kokosriekstus"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
          </span>
          <div className={tripPageHeroSectionDescriptionStyle}>
            <p className={tripPageHeroSectionDescriptionParagraphStyle}>
              10 dienu ceļojums pa Šrilanku kopā ar mani, mazā, līdz 6 cilvēku sieviešu grupā.
              Aktīvs, iedvesmojošs un pilnībā noorganizēts ceļojums, kuru Tu vari vienkārši baudīt.
              {` `}
              <strong>Šis nav tikai ceļojums. Tā ir pieredze.</strong>
            </p>
            <p className={tripPageHeroSectionDescriptionParagraphStyle}>
              Pirms 5 gadiem es pati devos ceļā un mājās tā arī neatgriezos. Es iemīlēju šo brīvības
              sajūtu, citādo kultūru un dzīves ritmu, un atradu savas mājas Šrilankā. Tagad es vēlos
              Tev parādīt šo valsti tā, kā to redzu es, ne tikai kā tūristam, bet no iekšpuses.
            </p>
            <p className={tripPageHeroSectionDescriptionParagraphStyle}>
              Mēs kopā izbaudīsim gan Šrilankas skaistākos “highlights”, gan vietas, kuras parasti
              tūristi neatrod. Redzēsim okeānu, kalnus, tējas plantācijas, piedzīvosim safari,
              meistarklases un īsto vietējo dzīvi.
            </p>
            <p className={tripPageHeroSectionDescriptionParagraphStyle}>
              Bet pats svarīgākais, šis ceļojums nav tikai par Šrilanku.{' '}
              <strong>Tas ir par piedzīvojumiem, smiekliem, emocijām un jauniem draugiem.</strong>{' '}
              Šis ir Tavs brīdis piedzīvot, izkāpt no savas komforta zonas un varbūt pat atklāt ko
              jaunu par sevi.
            </p>
          </div>
        </div>
        <div className={tripPageSummaryStyle}>
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Brauciena ilgums</span>
            <strong className={tripPageSummaryItemValueStyle}>10 dienas</strong>
          </div>
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Datumi</span>
            <strong className={tripPageSummaryItemValueStyle}>18/01/27 - 27/01/27</strong>
          </div>
          <span className={tripPageSummaryItemSeparatorStyle} />
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Ceļojuma veids</span>
            <strong className={tripPageSummaryItemValueStyle}>Atīvs ceļojums</strong>
          </div>
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Cik vietas?</span>
            <strong className={tripPageSummaryItemValueStyle}>6. meitenes</strong>
          </div>
          <span className={tripPageSummaryItemSeparatorStyle} />
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Brauciena sākums</span>
            <strong className={tripPageSummaryItemValueStyle}>Negombo, Sri Lanka</strong>
          </div>
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Ceļojuma beigas</span>
            <strong className={tripPageSummaryItemValueStyle}>Negombo, Sri Lanka</strong>
          </div>
          <span className={tripPageSummaryItemSeparatorStyle} />
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Cenā iekļauts</span>
            <ul className={tripPageSummaryItemValueListStyle}>
              <li className={tripPageSummaryItemValueListItemIncludedStyle}>Aktivitātes</li>
              <li className={tripPageSummaryItemValueListItemIncludedStyle}>Naktsmājas</li>
              <li className={tripPageSummaryItemValueListItemIncludedStyle}>Transports</li>
              <li className={tripPageSummaryItemValueListItemIncludedStyle}>Vīza</li>
            </ul>
          </div>
          <div className={tripPageSummaryItemStyle}>
            <span className={tripPageSummaryItemTitleStyle}>Cenā nav iekļauts</span>
            <ul className={tripPageSummaryItemValueListStyle}>
              <li className={tripPageSummaryItemValueListItemExcludedStyle}>Apdrošināšana</li>
              <li className={tripPageSummaryItemValueListItemExcludedStyle}>Ēšana</li>
              <li className={tripPageSummaryItemValueListItemExcludedStyle}>Lidojuma biļetes</li>
              <li className={tripPageSummaryItemValueListItemExcludedStyle}>Personīgās izmaksas</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={tripPageUspSectionStyle}>
        <Heading as="h1" variant="h2" className={tripPageUspTitleStyle}>
          Kāpēc jums patiks šis ceļojums
        </Heading>
        <ul className={tripPageUspItemListStyle}>
          <li>
            Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt
            puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks
            sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā
            vidē, citā kultūrā un jaunā kompānijā.
          </li>
          <li>
            Apceļosim galvenās Šrilankas vietas, kuras tik tiešām ir vērts apskatīt. Kalnus,
            pludmales, ūdenkritumus, tējas plantācijas. Ceļojums būs aktīvs, jo parādīšu cik
            Šrilanka var būt daudzveidīga. Katrs varēs atrast savu mīļāko Šrilankas stūrīti.
          </li>
          <li>
            Rādīšu Šrilanu no savas pieredzes. Vietas man ir jau zināmas, tāpēc vari uzticēties man.
            Gribu lai vari pilnīgi atslābt no ikdienas un atvēr acis kaut kam jaunam. Šrilanka ir
            manas mājas jau kā 2. Gadus, un ja jau kādu laiku seko @dzivetropos varēsi pieredzēt kā
            patiesi ir dzīvot Šrilankā.
          </li>
          <li>
            Aktīva atpūta. Būs iespēja sērfot, piedalīties jogas nodarbībās, teisīt gredzenus,
            baudīt Šrilankas virtuvi, brauksim gan pa upi, gan piedzīvosim brīvdabas ziloņu safari.
            Ja esi par jauniem piedzīvojumiem, šis ir ceļojums Tev.
          </li>
          <li>
            Ceļojumā brauksim maza meiteņu grupa. Kopā 7 meitenes, (ieskaitot mani). Šī ir tava
            iespēja iepazīt līdzīgi domājošus cilvēkus un cerams pat draudzenes uz visu mūžu.
          </li>
        </ul>
      </section>
      <Heading as="h1" variant="h3" className={tripPageTitleStyle}>
        Ceļojuma plāns
      </Heading>
      <section className={tripPagePlanItinerarySectionStyle}>
        <span className={tripPagePlanItinerarySectionMapStyle}>
          <Image
            src="/images/srilanka-lv_10-dienu-celojums_itenerary-map.png"
            alt="Karte ar mūsu ceļojuma uz Šrilanku spilgtākajiem notikumiem"
            sizes="auto"
            quality={75}
            width={312}
            height={312}
          />
        </span>
        <div className={tripPagePlanItineraryStyle}>
          <TripPageExpandable
            title="Diena 1"
            subject="Ielidošana in Colombo, iekārtošanās"
            content={
              <span>
                Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs
                atklāt puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums,
                bet laiks sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu
                pilnīgi svešā vidē, citā kultūrā un jaunā kompānijā.
              </span>
            }
          />
          <hr className={tripPagePlanItineraryItemSeparatorStyle} />
          <TripPageExpandable
            title="Diena 2"
            subject="Suvenīri in Pinnawala, pastaigas un ziloņi"
            content={
              <span>
                Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs
                atklāt puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums,
                bet laiks sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu
                pilnīgi svešā vidē, citā kultūrā un jaunā kompānijā.
              </span>
            }
          />
          <hr className={tripPagePlanItineraryItemSeparatorStyle} />
          <TripPageExpandable
            title="Diena 3"
            subject="Ceļš uz Ellu un tējas plantācijas"
            content={
              <span>
                Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs
                atklāt puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums,
                bet laiks sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu
                pilnīgi svešā vidē, citā kultūrā un jaunā kompānijā.
              </span>
            }
          />
          <hr className={tripPagePlanItineraryItemSeparatorStyle} />
          <TripPageExpandable
            title="Diena 4"
            subject="Aktīvā diena Ellā"
            content={
              <span>
                Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs
                atklāt puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums,
                bet laiks sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu
                pilnīgi svešā vidē, citā kultūrā un jaunā kompānijā.
              </span>
            }
          />
          <hr className={tripPagePlanItineraryItemSeparatorStyle} />
          <TripPageExpandable
            title="Diena 5"
            subject="Ceļš uz Udawalawe"
            content={
              <span>
                Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs
                atklāt puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums,
                bet laiks sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu
                pilnīgi svešā vidē, citā kultūrā un jaunā kompānijā.
              </span>
            }
          />
          <hr className={tripPagePlanItineraryItemSeparatorStyle} />
          <TripPageExpandable
            title="Diena 6"
            subject="Safari un ceļš uz Madiha"
            content={
              <span>
                Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs
                atklāt puses, kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums,
                bet laiks sev. Atlaist vaļā kontroli, uzticēties ceļam un galvenais noķert baudu
                pilnīgi svešā vidē, citā kultūrā un jaunā kompānijā.
              </span>
            }
          />
        </div>
      </section>
    </>
  );
};
