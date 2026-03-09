export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface DuaCategory {
  key: string;
  emoji: string;
  duas: Dua[];
}

export const duaCategories: DuaCategory[] = [
  {
    key: "morningEvening",
    emoji: "🌅",
    duas: [
      { id: 1, arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ", transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah", translation: "We have reached the morning and at this very time the whole kingdom belongs to Allah. All praise is for Allah." },
      { id: 2, arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ", transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur", translation: "O Allah, by Your leave we have reached the morning, by Your leave we have reached the evening. By Your leave we live and die, and unto You is our resurrection." },
      { id: 3, arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", transliteration: "Allahumma ma asbaha bi min ni'matin aw bi-ahadin min khalqika faminka wahdaka la sharika laka falakal-hamdu wa lakash-shukr", translation: "O Allah, what blessing I or any of Your creation have risen upon, is from You alone, without partner, so for You is all praise and unto You all thanks." },
      { id: 4, arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ", transliteration: "Subhan-Allahi wa bihamdihi adada khalqihi wa rida nafsihi wa zinata arshihi wa midada kalimatihi", translation: "Glory is to Allah and praise is to Him, by the multitude of His creation, by His pleasure, by the weight of His throne, and by the extent of His words." },
      { id: 5, arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq", translation: "I seek refuge in the perfect words of Allah from the evil of what He has created." },
      { id: 6, arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", transliteration: "Bismil-lahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-alim", translation: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is the All-Hearing, the All-Knowing." },
    ],
  },
  {
    key: "beforeAfterPrayer",
    emoji: "🕌",
    duas: [
      { id: 7, arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ", transliteration: "Allahumma Rabba hadhihid-da'watit-tammah, was-salatil-qa'imah, ati Muhammadanil-wasilata wal-fadilah", translation: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor." },
      { id: 8, arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ", transliteration: "Rabbij-alni muqimas-salati wa min dhurriyyati rabbana wa taqabbal du'a", translation: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, accept my supplication." },
      { id: 9, arabic: "سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٣)", transliteration: "SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x)", translation: "Glory be to Allah (33x), Praise be to Allah (33x), Allah is the Greatest (33x) — said after each prayer." },
      { id: 10, arabic: "أَسْتَغْفِرُ اللَّهَ (٣ مرات) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", transliteration: "Astaghfirullah (3x). Allahumma antas-salam wa minkas-salam tabarakta ya dhal-jalali wal-ikram", translation: "I seek Allah's forgiveness (3x). O Allah, You are Peace and from You is peace. Blessed are You, Possessor of majesty and honour." },
    ],
  },
  {
    key: "homeFamily",
    emoji: "🏠",
    duas: [
      { id: 11, arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا", transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa ala rabbina tawakkalna", translation: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust." },
      { id: 12, arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama", translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous." },
      { id: 13, arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ", transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan", translation: "O Allah, I seek refuge in You from worry and grief." },
    ],
  },
  {
    key: "travel",
    emoji: "✈️",
    duas: [
      { id: 14, arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ", transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun", translation: "Glory to Him who has subjected this to us, and we could never have it by our efforts, and to our Lord we shall return." },
      { id: 15, arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى", transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa", translation: "O Allah, we ask You in this journey for righteousness and piety." },
      { id: 16, arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ", transliteration: "Allahumma hawwin alayna safarana hadha watwi anna bu'dahu", translation: "O Allah, make this journey easy for us and fold up its distance for us." },
    ],
  },
  {
    key: "foodDrink",
    emoji: "🍽️",
    duas: [
      { id: 17, arabic: "بِسْمِ اللَّهِ", transliteration: "Bismillah", translation: "In the name of Allah (said before eating)." },
      { id: 18, arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin", translation: "Praise be to Allah who fed us, gave us drink, and made us Muslims." },
      { id: 19, arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ", transliteration: "Allahumma barik lana fihi wa at'imna khayran minhu", translation: "O Allah, bless it for us and feed us better than it." },
    ],
  },
  {
    key: "hajjUmrah",
    emoji: "🕋",
    duas: [
      { id: 20, arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ", transliteration: "Labbayk Allahumma labbayk, labbayk la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak", translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty, You have no partner." },
      { id: 21, arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar", translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire." },
    ],
  },
  {
    key: "sicknessHealing",
    emoji: "💚",
    duas: [
      { id: 22, arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا", transliteration: "Allahumma rabban-nas, adhhibil-ba's, ishfi antash-shafi la shifa'a illa shifa'uka shifa'an la yughadiru saqama", translation: "O Allah, Lord of mankind, remove the affliction. Cure, for You are the Curer. There is no cure except Your cure, a cure that leaves no illness." },
      { id: 23, arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ", transliteration: "As'alul-lahal-Azima Rabbal-Arshil-Azimi an yashfiyak", translation: "I ask Allah the Almighty, Lord of the Mighty Throne, to cure you. (7 times)" },
      { id: 24, arabic: "بِسْمِ اللَّهِ أَرْقِيكَ مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ اللَّهُ يَشْفِيكَ", transliteration: "Bismillahi arqika min kulli shay'in yu'dhika min sharri kulli nafsin aw 'ayni hasidin, Allahu yashfik", translation: "In the name of Allah I perform ruqyah for you, from everything that is harming you, from the evil of every soul or envious eye, may Allah heal you." },
    ],
  },
  {
    key: "goodEtiquette",
    emoji: "🤲",
    duas: [
      { id: 25, arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى", transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina", translation: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency." },
      { id: 26, arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَأَعِذْنِي مِنْ شَرِّ نَفْسِي", transliteration: "Allahumma alhimni rushdi wa a'idhni min sharri nafsi", translation: "O Allah, inspire me with my guidance and protect me from the evil of my soul." },
      { id: 27, arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", transliteration: "Rabbish-rahli sadri wa yassirli amri", translation: "My Lord, expand for me my breast and ease for me my task." },
    ],
  },
  {
    key: "natureWeather",
    emoji: "🌧️",
    duas: [
      { id: 28, arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا", transliteration: "Allahumma sayyiban nafi'a", translation: "O Allah, let it be a beneficial rain." },
      { id: 29, arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ", transliteration: "Subhanal-ladhi yusabbihur-ra'du bihamdihi wal-mala'ikatu min khifatih", translation: "Glory to Him whom thunder glorifies with His praise, and the angels out of fear of Him." },
    ],
  },
  {
    key: "seekingForgiveness",
    emoji: "🤍",
    duas: [
      { id: 30, arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ", transliteration: "Astaghfirullal-Azimal-ladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilayh", translation: "I seek forgiveness from Allah the Almighty, there is no deity except Him, the Ever-Living, the Sustainer, and I repent to Him." },
      { id: 31, arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ", transliteration: "Allahumma anta Rabbi la ilaha illa anta khalaqtani wa ana 'abduka wa ana ala 'ahdika wa wa'dika mastata't", translation: "O Allah, You are my Lord. There is no deity except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can." },
      { id: 32, arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunnanna minal-khasirin", translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers." },
      { id: 33, arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ", transliteration: "Rabbighfir li wa tub 'alayya innaka antat-Tawwabur-Rahim", translation: "My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of repentance, the Merciful." },
    ],
  },
];
