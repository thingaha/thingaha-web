### Get ALL Myanmar division , distinct, township API

| API                       |        Description        | Action |
| :------------------------ | :-----------------------: | -----: |
| /api/v1/myanmar_divisions | GET ALL Myanmar Divisions |    GET |

Output Sample:

```json
{
  "data": {
    "divisions": [
      {
        "districts": [
          {
            "district_name": "Gangaw",
            "townships": [
              {
                "township_name": "Gangaw",
                "type": "township"
              },
              {
                "township_name": "Kyaukhtu",
                "type": "township"
              },
              {
                "township_name": "Saw",
                "type": "township"
              },
              {
                "township_name": "Tilin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Magway",
            "townships": [
              {
                "township_name": "Magway",
                "type": "township"
              },
              {
                "township_name": "Chauck",
                "type": "township"
              },
              {
                "township_name": "Myothit",
                "type": "township"
              },
              {
                "township_name": "Natmauk",
                "type": "township"
              },
              {
                "township_name": "Taungdwingyi",
                "type": "township"
              },
              {
                "township_name": "Yenangyaung",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Minbu",
            "townships": [
              {
                "township_name": "Minbu",
                "type": "township"
              },
              {
                "township_name": "Ngape",
                "type": "township"
              },
              {
                "township_name": "Pwintbyu",
                "type": "township"
              },
              {
                "township_name": "Salin",
                "type": "township"
              },
              {
                "township_name": "Sidoktaya",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Pakokku",
            "townships": [
              {
                "township_name": "Pakokku",
                "type": "township"
              },
              {
                "township_name": "Myaing",
                "type": "township"
              },
              {
                "township_name": "Pauk",
                "type": "township"
              },
              {
                "township_name": "Seikphyu",
                "type": "township"
              },
              {
                "township_name": "Yesagyo",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Thayet",
            "townships": [
              {
                "township_name": "Thayet",
                "type": "township"
              },
              {
                "township_name": "Aunglan",
                "type": "township"
              },
              {
                "township_name": "Kamma",
                "type": "township"
              },
              {
                "township_name": "Mindon",
                "type": "township"
              },
              {
                "township_name": "Minhla",
                "type": "township"
              },
              {
                "township_name": "Sinbaungwe",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "magway",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Kyaukse",
            "townships": [
              {
                "township_name": "Kyaukse",
                "type": "township"
              },
              {
                "township_name": "Myittha",
                "type": "township"
              },
              {
                "township_name": "Sintgaing",
                "type": "township"
              },
              {
                "township_name": "Tada-U",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mandalay",
            "townships": [
              {
                "township_name": "Amarapura",
                "type": "township"
              },
              {
                "township_name": "Aungmyethazan",
                "type": "township"
              },
              {
                "township_name": "Chanayethazan",
                "type": "township"
              },
              {
                "township_name": "Chanmyathazi",
                "type": "township"
              },
              {
                "township_name": "Mahaaungmye",
                "type": "township"
              },
              {
                "township_name": "Patheingyi",
                "type": "township"
              },
              {
                "township_name": "Pyigyidagun",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Meiktila",
            "townships": [
              {
                "township_name": "Mahlaing",
                "type": "township"
              },
              {
                "township_name": "Meiktila",
                "type": "township"
              },
              {
                "township_name": "Thazi",
                "type": "township"
              },
              {
                "township_name": "Wundwin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Myingyan",
            "townships": [
              {
                "township_name": "Myingyan",
                "type": "township"
              },
              {
                "township_name": "Natogyi",
                "type": "township"
              },
              {
                "township_name": "Nganzun",
                "type": "township"
              },
              {
                "township_name": "Thaungtha",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Nyaung-U",
            "townships": [
              {
                "township_name": "Kyaukpadaung",
                "type": "township"
              },
              {
                "township_name": "Ngathayauk",
                "type": "township"
              },
              {
                "township_name": "Nyaung-U",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Pyinoolwin",
            "townships": [
              {
                "township_name": "Madaya",
                "type": "township"
              },
              {
                "township_name": "Mogok",
                "type": "township"
              },
              {
                "township_name": "Pyinoolwin",
                "type": "township"
              },
              {
                "township_name": "Singu",
                "type": "township"
              },
              {
                "township_name": "Tagaung",
                "type": "township"
              },
              {
                "township_name": "Thabeikkyin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Yamethin",
            "townships": [
              {
                "township_name": "Pyawbwe",
                "type": "township"
              },
              {
                "township_name": "Yamethin",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "mandalay",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Dekkhina(South Naypyidaw)",
            "townships": [
              {
                "township_name": "Dekkhinathiri",
                "type": "township"
              },
              {
                "township_name": "Lewe",
                "type": "township"
              },
              {
                "township_name": "Pyinmana",
                "type": "township"
              },
              {
                "township_name": "Zabuthiri",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Ottara(North Naypyidaw)",
            "townships": [
              {
                "township_name": "Ottarathiri",
                "type": "township"
              },
              {
                "township_name": "Pobbathiri",
                "type": "township"
              },
              {
                "township_name": "Tatkon",
                "type": "township"
              },
              {
                "township_name": "Zeyarthiri",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "naypyidaw union territory",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Bawlakhe",
            "townships": [
              {
                "township_name": "Bawlakhe",
                "type": "township"
              },
              {
                "township_name": "Hpasawng",
                "type": "township"
              },
              {
                "township_name": "Mese",
                "type": "township"
              },
              {
                "township_name": "Ywathit",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Loikaw",
            "townships": [
              {
                "township_name": "Demoso",
                "type": "township"
              },
              {
                "township_name": "Hpruso",
                "type": "township"
              },
              {
                "township_name": "Loikaw",
                "type": "township"
              },
              {
                "township_name": "Shadaw",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "kayah state",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Kengtung",
            "townships": [
              {
                "township_name": "Kengtung",
                "type": "township"
              },
              {
                "township_name": "Mine Pauk",
                "type": "township"
              },
              {
                "township_name": "Minelar",
                "type": "township"
              },
              {
                "township_name": "Mong Khet",
                "type": "township"
              },
              {
                "township_name": "Mong La",
                "type": "township"
              },
              {
                "township_name": "Mong Yang",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mong Hpayak",
            "townships": [
              {
                "township_name": "Mineyu",
                "type": "township"
              },
              {
                "township_name": "Mong Hpayak",
                "type": "township"
              },
              {
                "township_name": "Mong Yawng",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mong Hsat",
            "townships": [
              {
                "township_name": "Minekoke",
                "type": "township"
              },
              {
                "township_name": "Monehta",
                "type": "township"
              },
              {
                "township_name": "Mong Hsat",
                "type": "township"
              },
              {
                "township_name": "Mong Ping",
                "type": "township"
              },
              {
                "township_name": "Mong Tong",
                "type": "township"
              },
              {
                "township_name": "Ponparkyin",
                "type": "township"
              },
              {
                "township_name": "Tontar",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Tachileik",
            "townships": [
              {
                "township_name": "Kyaing Lap",
                "type": "township"
              },
              {
                "township_name": "Tachileik",
                "type": "township"
              },
              {
                "township_name": "Talay",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Kunlong",
            "townships": [
              {
                "township_name": "Kunlong",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Kyaukme",
            "townships": [
              {
                "township_name": "Hsipaw",
                "type": "township"
              },
              {
                "township_name": "Kyaukme",
                "type": "township"
              },
              {
                "township_name": "Mantong",
                "type": "township"
              },
              {
                "township_name": "Minelon",
                "type": "township"
              },
              {
                "township_name": "Minengaw",
                "type": "township"
              },
              {
                "township_name": "Namhsan",
                "type": "township"
              },
              {
                "township_name": "Namtu",
                "type": "township"
              },
              {
                "township_name": "Nawnghkio",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Lashio",
            "townships": [
              {
                "township_name": "Hsenwi",
                "type": "township"
              },
              {
                "township_name": "Lashio",
                "type": "township"
              },
              {
                "township_name": "Mongyai",
                "type": "township"
              },
              {
                "township_name": "Tangyan",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Laukkaing",
            "townships": [
              {
                "township_name": "Chinshwehaw",
                "type": "township"
              },
              {
                "township_name": "Konkyan",
                "type": "township"
              },
              {
                "township_name": "Laukkaing",
                "type": "township"
              },
              {
                "township_name": "Mawhtike",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mu Se",
            "townships": [
              {
                "township_name": "Kutkai",
                "type": "township"
              },
              {
                "township_name": "Manhero",
                "type": "township"
              },
              {
                "township_name": "Monekoe",
                "type": "township"
              },
              {
                "township_name": "Mu Se",
                "type": "township"
              },
              {
                "township_name": "Namhkam",
                "type": "township"
              },
              {
                "township_name": "Pansai",
                "type": "township"
              },
              {
                "township_name": "Tamoenye",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Hopang",
            "townships": [
              {
                "township_name": "Hopang",
                "type": "township"
              },
              {
                "township_name": "Mongmao",
                "type": "township"
              },
              {
                "township_name": "Namtit",
                "type": "township"
              },
              {
                "township_name": "Pangwaun",
                "type": "township"
              },
              {
                "township_name": "Panlong",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Matman",
            "townships": [
              {
                "township_name": "Man Kan",
                "type": "township"
              },
              {
                "township_name": "Matman",
                "type": "township"
              },
              {
                "township_name": "Namphan",
                "type": "township"
              },
              {
                "township_name": "Pangsang Township (Pan",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mongmit",
            "townships": [
              {
                "township_name": "Mabein",
                "type": "township"
              },
              {
                "township_name": "Mongmit",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Langkho",
            "townships": [
              {
                "township_name": "Homane",
                "type": "township"
              },
              {
                "township_name": "Kengtaung",
                "type": "township"
              },
              {
                "township_name": "Langkho",
                "type": "township"
              },
              {
                "township_name": "Mawkmai",
                "type": "township"
              },
              {
                "township_name": "Mong Nai",
                "type": "township"
              },
              {
                "township_name": "Mong Pan",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Loilen",
            "townships": [
              {
                "township_name": "Karli",
                "type": "township"
              },
              {
                "township_name": "Kholan",
                "type": "township"
              },
              {
                "township_name": "Kunhing",
                "type": "township"
              },
              {
                "township_name": "Kyethi",
                "type": "township"
              },
              {
                "township_name": "Lai-Hka",
                "type": "township"
              },
              {
                "township_name": "Loilen",
                "type": "township"
              },
              {
                "township_name": "Minenaung",
                "type": "township"
              },
              {
                "township_name": "Minesan",
                "type": "township"
              },
              {
                "township_name": "Mong Hsu",
                "type": "township"
              },
              {
                "township_name": "Mong Kung",
                "type": "township"
              },
              {
                "township_name": "Nansang",
                "type": "township"
              },
              {
                "township_name": "Panglong",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Taunggyi",
            "townships": [
              {
                "township_name": "Hopong",
                "type": "township"
              },
              {
                "township_name": "Hsi Hseng",
                "type": "township"
              },
              {
                "township_name": "Indaw",
                "type": "township"
              },
              {
                "township_name": "Kalaw",
                "type": "township"
              },
              {
                "township_name": "Kyauktalongyi",
                "type": "township"
              },
              {
                "township_name": "Lawksawk",
                "type": "township"
              },
              {
                "township_name": "Naungtayar",
                "type": "township"
              },
              {
                "township_name": "Nyaungshwe",
                "type": "township"
              },
              {
                "township_name": "Pekon",
                "type": "township"
              },
              {
                "township_name": "Pingdaya",
                "type": "township"
              },
              {
                "township_name": "Pinlaung",
                "type": "township"
              },
              {
                "township_name": "Taunggyi",
                "type": "township"
              },
              {
                "township_name": "Ywangan",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "shan state",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Hinthada",
            "townships": [
              {
                "township_name": "Hinthada",
                "type": "township"
              },
              {
                "township_name": "Ingapu",
                "type": "township"
              },
              {
                "township_name": "Kyangin",
                "type": "township"
              },
              {
                "township_name": "Lemyethna",
                "type": "township"
              },
              {
                "township_name": "Myanaung",
                "type": "township"
              },
              {
                "township_name": "Zalun",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Labutta",
            "townships": [
              {
                "township_name": "Labutta",
                "type": "township"
              },
              {
                "township_name": "Mawlamyinegyun",
                "type": "township"
              },
              {
                "township_name": "Pyinsalu",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Ma-ubin",
            "townships": [
              {
                "township_name": "Danuphyu",
                "type": "township"
              },
              {
                "township_name": "Ma-ubin",
                "type": "township"
              },
              {
                "township_name": "Nyaungdon",
                "type": "township"
              },
              {
                "township_name": "Pantanaw",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Myaungmya",
            "townships": [
              {
                "township_name": "Einme",
                "type": "township"
              },
              {
                "township_name": "Myaungmya",
                "type": "township"
              },
              {
                "township_name": "Wakema",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Pathein",
            "townships": [
              {
                "township_name": "Hainggyikyun",
                "type": "township"
              },
              {
                "township_name": "Kangyidaunk",
                "type": "township"
              },
              {
                "township_name": "Kyaunggon",
                "type": "township"
              },
              {
                "township_name": "Kyonpyaw",
                "type": "township"
              },
              {
                "township_name": "Ngapudaw",
                "type": "township"
              },
              {
                "township_name": "Ngathaingchaung",
                "type": "township"
              },
              {
                "township_name": "Ngayokaung",
                "type": "township"
              },
              {
                "township_name": "Ngwehsaung",
                "type": "township"
              },
              {
                "township_name": "Pathein",
                "type": "township"
              },
              {
                "township_name": "Shwethaungyan",
                "type": "township"
              },
              {
                "township_name": "Thabaung",
                "type": "township"
              },
              {
                "township_name": "Yekyi",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Pyapon",
            "townships": [
              {
                "township_name": "Ahmar",
                "type": "township"
              },
              {
                "township_name": "Bogale",
                "type": "township"
              },
              {
                "township_name": "Dedaye",
                "type": "township"
              },
              {
                "township_name": "Kyaiklat",
                "type": "township"
              },
              {
                "township_name": "Pyapon",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "ayeyarwady",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Bago",
            "townships": [
              {
                "township_name": "Aungmyin",
                "type": "township"
              },
              {
                "township_name": "Bago",
                "type": "township"
              },
              {
                "township_name": "Daik-U",
                "type": "township"
              },
              {
                "township_name": "Hpayargyi",
                "type": "township"
              },
              {
                "township_name": "Intagaw",
                "type": "township"
              },
              {
                "township_name": "Kawa",
                "type": "township"
              },
              {
                "township_name": "Kyauktaga",
                "type": "township"
              },
              {
                "township_name": "Madauk",
                "type": "township"
              },
              {
                "township_name": "Nyaunglebin",
                "type": "township"
              },
              {
                "township_name": "Peinzalot",
                "type": "township"
              },
              {
                "township_name": "Penwegon",
                "type": "township"
              },
              {
                "township_name": "Pyuntaza",
                "type": "township"
              },
              {
                "township_name": "Shwegyin",
                "type": "township"
              },
              {
                "township_name": "Thanatpin",
                "type": "township"
              },
              {
                "township_name": "Waw",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Taungoo",
            "townships": [
              {
                "township_name": "Kanyutkwin",
                "type": "township"
              },
              {
                "township_name": "Kaytumadi",
                "type": "township"
              },
              {
                "township_name": "Kyaukkyi",
                "type": "township"
              },
              {
                "township_name": "Kywebwe",
                "type": "township"
              },
              {
                "township_name": "Mone",
                "type": "township"
              },
              {
                "township_name": "Myohla",
                "type": "township"
              },
              {
                "township_name": "Natthangwin",
                "type": "township"
              },
              {
                "township_name": "Nyaungbinthar",
                "type": "township"
              },
              {
                "township_name": "Oktwin",
                "type": "township"
              },
              {
                "township_name": "Pyu",
                "type": "township"
              },
              {
                "township_name": "Swa",
                "type": "township"
              },
              {
                "township_name": "Tantabin",
                "type": "township"
              },
              {
                "township_name": "Taungoo",
                "type": "township"
              },
              {
                "township_name": "Thagara",
                "type": "township"
              },
              {
                "township_name": "Yaeni",
                "type": "township"
              },
              {
                "township_name": "Yedashe",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Pyay",
            "townships": [
              {
                "township_name": "Innma",
                "type": "township"
              },
              {
                "township_name": "Okshipin",
                "type": "township"
              },
              {
                "township_name": "Padaung",
                "type": "township"
              },
              {
                "township_name": "Padigone",
                "type": "township"
              },
              {
                "township_name": "Paukkaung",
                "type": "township"
              },
              {
                "township_name": "Paungdale",
                "type": "township"
              },
              {
                "township_name": "Paungde",
                "type": "township"
              },
              {
                "township_name": "Pyay",
                "type": "township"
              },
              {
                "township_name": "Shwedaung",
                "type": "township"
              },
              {
                "township_name": "Sinmeswe",
                "type": "township"
              },
              {
                "township_name": "Thegon",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Thayarwady",
            "townships": [
              {
                "township_name": "Gyobingauk",
                "type": "township"
              },
              {
                "township_name": "Letpadan",
                "type": "township"
              },
              {
                "township_name": "Minhla",
                "type": "township"
              },
              {
                "township_name": "Monyo",
                "type": "township"
              },
              {
                "township_name": "Nattalin",
                "type": "township"
              },
              {
                "township_name": "Okpho",
                "type": "township"
              },
              {
                "township_name": "Ooethegone",
                "type": "township"
              },
              {
                "township_name": "Sitkwin",
                "type": "township"
              },
              {
                "township_name": "Tapun",
                "type": "township"
              },
              {
                "township_name": "Tharrawaddy",
                "type": "township"
              },
              {
                "township_name": "Thonze",
                "type": "township"
              },
              {
                "township_name": "Zigon",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "bago",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "East Yangon",
            "townships": [
              {
                "township_name": "Botataung",
                "type": "township"
              },
              {
                "township_name": "City",
                "type": "township"
              },
              {
                "township_name": "Dagon Seikkan",
                "type": "township"
              },
              {
                "township_name": "Dawbon",
                "type": "township"
              },
              {
                "township_name": "East Dagon",
                "type": "township"
              },
              {
                "township_name": "Mingala Taungnyunt",
                "type": "township"
              },
              {
                "township_name": "North Dagon",
                "type": "township"
              },
              {
                "township_name": "North Okkalapa",
                "type": "township"
              },
              {
                "township_name": "Pazundaung",
                "type": "township"
              },
              {
                "township_name": "South Dagon",
                "type": "township"
              },
              {
                "township_name": "South Okkalapa",
                "type": "township"
              },
              {
                "township_name": "Tamwe",
                "type": "township"
              },
              {
                "township_name": "Thaketa",
                "type": "township"
              },
              {
                "township_name": "Thingangyun",
                "type": "township"
              },
              {
                "township_name": "Yankin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "North Yangon",
            "townships": [
              {
                "township_name": "City",
                "type": "township"
              },
              {
                "township_name": "Hlaingthaya",
                "type": "township"
              },
              {
                "township_name": "Hlegu",
                "type": "township"
              },
              {
                "township_name": "Hmawbi",
                "type": "township"
              },
              {
                "township_name": "Htantabin",
                "type": "township"
              },
              {
                "township_name": "Insein",
                "type": "township"
              },
              {
                "township_name": "Mingaladon",
                "type": "township"
              },
              {
                "township_name": "Rural",
                "type": "township"
              },
              {
                "township_name": "Shwepyitha",
                "type": "township"
              },
              {
                "township_name": "Taikkyi",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "South Yangon",
            "townships": [
              {
                "township_name": "City",
                "type": "township"
              },
              {
                "township_name": "Cocokyun",
                "type": "township"
              },
              {
                "township_name": "Dala",
                "type": "township"
              },
              {
                "township_name": "Kawhmu",
                "type": "township"
              },
              {
                "township_name": "Kayan",
                "type": "township"
              },
              {
                "township_name": "Kungyangon",
                "type": "township"
              },
              {
                "township_name": "Kyauktan",
                "type": "township"
              },
              {
                "township_name": "Rural",
                "type": "township"
              },
              {
                "township_name": "Seikkyi Kanaungto",
                "type": "township"
              },
              {
                "township_name": "Tada",
                "type": "township"
              },
              {
                "township_name": "Thanlyin",
                "type": "township"
              },
              {
                "township_name": "Thongwa",
                "type": "township"
              },
              {
                "township_name": "Twante",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "West Yangon(Downtown)",
            "townships": [
              {
                "township_name": "Ahlon",
                "type": "township"
              },
              {
                "township_name": "Bahan",
                "type": "township"
              },
              {
                "township_name": "City",
                "type": "township"
              },
              {
                "township_name": "Dagon",
                "type": "township"
              },
              {
                "township_name": "Hlaing",
                "type": "township"
              },
              {
                "township_name": "Kamayut",
                "type": "township"
              },
              {
                "township_name": "Kyauktada",
                "type": "township"
              },
              {
                "township_name": "Kyimyindaing",
                "type": "township"
              },
              {
                "township_name": "Lanmadaw",
                "type": "township"
              },
              {
                "township_name": "Latha",
                "type": "township"
              },
              {
                "township_name": "Mayangon",
                "type": "township"
              },
              {
                "township_name": "Pabedan",
                "type": "township"
              },
              {
                "township_name": "Sanchaung",
                "type": "township"
              },
              {
                "township_name": "Seikkan",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "yangon",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Bhamo",
            "townships": [
              {
                "township_name": "Bhamo",
                "type": "township"
              },
              {
                "township_name": "Dotphoneyan",
                "type": "township"
              },
              {
                "township_name": "Lwegel",
                "type": "township"
              },
              {
                "township_name": "Mansi",
                "type": "township"
              },
              {
                "township_name": "Momauk",
                "type": "township"
              },
              {
                "township_name": "Myohla",
                "type": "township"
              },
              {
                "township_name": "Shwegu",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mohnyin",
            "townships": [
              {
                "township_name": "Hopin",
                "type": "township"
              },
              {
                "township_name": "Hpakant",
                "type": "township"
              },
              {
                "township_name": "Kamine",
                "type": "township"
              },
              {
                "township_name": "Mogaung",
                "type": "township"
              },
              {
                "township_name": "Mohnyin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Myitkyina",
            "townships": [
              {
                "township_name": "Chipwi",
                "type": "township"
              },
              {
                "township_name": "Hsadone",
                "type": "township"
              },
              {
                "township_name": "Hsawlaw",
                "type": "township"
              },
              {
                "township_name": "Hsinbo",
                "type": "township"
              },
              {
                "township_name": "Injangyang",
                "type": "township"
              },
              {
                "township_name": "Kanpaikti",
                "type": "township"
              },
              {
                "township_name": "Myitkyina",
                "type": "township"
              },
              {
                "township_name": "Panwa",
                "type": "township"
              },
              {
                "township_name": "Shinbwayyan",
                "type": "township"
              },
              {
                "township_name": "Tanai",
                "type": "township"
              },
              {
                "township_name": "Waingmaw",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Putao",
            "townships": [
              {
                "township_name": "Kawnglanghpu",
                "type": "township"
              },
              {
                "township_name": "Machanbaw",
                "type": "township"
              },
              {
                "township_name": "Nogmung",
                "type": "township"
              },
              {
                "township_name": "Pannandin",
                "type": "township"
              },
              {
                "township_name": "Putao",
                "type": "township"
              },
              {
                "township_name": "Sumprabum",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "kachin state",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Hkamti",
            "townships": [
              {
                "township_name": "Donhee",
                "type": "township"
              },
              {
                "township_name": "Hkamti",
                "type": "township"
              },
              {
                "township_name": "Homalin",
                "type": "township"
              },
              {
                "township_name": "Htanparkway",
                "type": "township"
              },
              {
                "township_name": "Lahe",
                "type": "township"
              },
              {
                "township_name": "Leshi Township (Lay",
                "type": "township"
              },
              {
                "township_name": "Mobaingluk",
                "type": "township"
              },
              {
                "township_name": "Nanyun",
                "type": "township"
              },
              {
                "township_name": "Pansaung",
                "type": "township"
              },
              {
                "township_name": "Sonemara",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Kanbalu",
            "townships": [
              {
                "township_name": "Kanbalu",
                "type": "township"
              },
              {
                "township_name": "Kyunhla",
                "type": "township"
              },
              {
                "township_name": "Taze",
                "type": "township"
              },
              {
                "township_name": "Ye-U",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Kale",
            "townships": [
              {
                "township_name": "Kale",
                "type": "township"
              },
              {
                "township_name": "Kalewa",
                "type": "township"
              },
              {
                "township_name": "Mingin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Katha",
            "townships": [
              {
                "township_name": "Banmauk",
                "type": "township"
              },
              {
                "township_name": "Indaw",
                "type": "township"
              },
              {
                "township_name": "Katha",
                "type": "township"
              },
              {
                "township_name": "Kawlin",
                "type": "township"
              },
              {
                "township_name": "Pinlebu",
                "type": "township"
              },
              {
                "township_name": "Tigyaing",
                "type": "township"
              },
              {
                "township_name": "Wuntho",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mawlaik",
            "townships": [
              {
                "township_name": "Mawlaik",
                "type": "township"
              },
              {
                "township_name": "Paungbyin",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Monywa",
            "townships": [
              {
                "township_name": "Ayadaw",
                "type": "township"
              },
              {
                "township_name": "Budalin",
                "type": "township"
              },
              {
                "township_name": "Chaung-U",
                "type": "township"
              },
              {
                "township_name": "Monywa",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Sagaing",
            "townships": [
              {
                "township_name": "Myaung",
                "type": "township"
              },
              {
                "township_name": "Myinmu",
                "type": "township"
              },
              {
                "township_name": "Sagaing",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Shwebo",
            "townships": [
              {
                "township_name": "Khin-U",
                "type": "township"
              },
              {
                "township_name": "Kyaukmyaung",
                "type": "township"
              },
              {
                "township_name": "Shwebo",
                "type": "township"
              },
              {
                "township_name": "Tabayin",
                "type": "township"
              },
              {
                "township_name": "Wetlet",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Tamu",
            "townships": [
              {
                "township_name": "Khampat",
                "type": "township"
              },
              {
                "township_name": "Myothit",
                "type": "township"
              },
              {
                "township_name": "Tamu",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Yinmabin",
            "townships": [
              {
                "township_name": "Kani",
                "type": "township"
              },
              {
                "township_name": "Pale",
                "type": "township"
              },
              {
                "township_name": "Salingyi",
                "type": "township"
              },
              {
                "township_name": "Yinmabin",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "sagaing",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Hpa-an",
            "townships": [
              {
                "township_name": "Bawgali",
                "type": "township"
              },
              {
                "township_name": "Hlaignbwe",
                "type": "township"
              },
              {
                "township_name": "Hpa-an",
                "type": "township"
              },
              {
                "township_name": "Leiktho",
                "type": "township"
              },
              {
                "township_name": "Paingkyon",
                "type": "township"
              },
              {
                "township_name": "Shan Ywathit",
                "type": "township"
              },
              {
                "township_name": "Thandaunggyi",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Hpapun",
            "townships": [
              {
                "township_name": "Hpapun",
                "type": "township"
              },
              {
                "township_name": "Kamamaung",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Kawkareik",
            "townships": [
              {
                "township_name": "Kawkareik",
                "type": "township"
              },
              {
                "township_name": "Kyaidon",
                "type": "township"
              },
              {
                "township_name": "Kyain Seikgyi",
                "type": "township"
              },
              {
                "township_name": "Payarthonezu",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Myawaddy",
            "townships": [
              {
                "township_name": "Myawaddy",
                "type": "township"
              },
              {
                "township_name": "Sugali",
                "type": "township"
              },
              {
                "township_name": "Wawlaymyaing",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "kayin state",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Mawlamyine",
            "townships": [
              {
                "township_name": "Chaungzon",
                "type": "township"
              },
              {
                "township_name": "Khawzar",
                "type": "township"
              },
              {
                "township_name": "Kyaikkhami",
                "type": "township"
              },
              {
                "township_name": "Kyaikmaraw",
                "type": "township"
              },
              {
                "township_name": "Lamine",
                "type": "township"
              },
              {
                "township_name": "Mawlamyine",
                "type": "township"
              },
              {
                "township_name": "Mudon",
                "type": "township"
              },
              {
                "township_name": "Thanbyuzayat",
                "type": "township"
              },
              {
                "township_name": "Ye",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Thaton",
            "townships": [
              {
                "township_name": "Bilin",
                "type": "township"
              },
              {
                "township_name": "Kyaikto",
                "type": "township"
              },
              {
                "township_name": "Mottama",
                "type": "township"
              },
              {
                "township_name": "Paung",
                "type": "township"
              },
              {
                "township_name": "Suvannawadi",
                "type": "township"
              },
              {
                "township_name": "Thaton",
                "type": "township"
              },
              {
                "township_name": "Zingyeik",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "mon state",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Dawei",
            "townships": [
              {
                "township_name": "Dawei",
                "type": "township"
              },
              {
                "township_name": "Kaleinaung",
                "type": "township"
              },
              {
                "township_name": "Launglon",
                "type": "township"
              },
              {
                "township_name": "Myitta",
                "type": "township"
              },
              {
                "township_name": "Thayetchaung",
                "type": "township"
              },
              {
                "township_name": "Yebyu",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Kawthoung",
            "townships": [
              {
                "township_name": "Bokpyin",
                "type": "township"
              },
              {
                "township_name": "Karathuri",
                "type": "township"
              },
              {
                "township_name": "Kawthoung",
                "type": "township"
              },
              {
                "township_name": "Khamaukgyi",
                "type": "township"
              },
              {
                "township_name": "Pyigyimandaing",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Myeik",
            "townships": [
              {
                "township_name": "Kyunsu",
                "type": "township"
              },
              {
                "township_name": "Myeik",
                "type": "township"
              },
              {
                "township_name": "Palauk",
                "type": "township"
              },
              {
                "township_name": "Palaw",
                "type": "township"
              },
              {
                "township_name": "Tanintharyi",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "tanintharyi",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Falam",
            "townships": [
              {
                "township_name": "Cikha",
                "type": "township"
              },
              {
                "township_name": "Falam",
                "type": "township"
              },
              {
                "township_name": "Rikhuadal",
                "type": "township"
              },
              {
                "township_name": "Tiddim",
                "type": "township"
              },
              {
                "township_name": "Ton Zang",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Hakha",
            "townships": [
              {
                "township_name": "Hakha",
                "type": "township"
              },
              {
                "township_name": "Htantlang",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mindat",
            "townships": [
              {
                "township_name": "Kanpetlet",
                "type": "township"
              },
              {
                "township_name": "Matupi",
                "type": "township"
              },
              {
                "township_name": "Mindat",
                "type": "township"
              },
              {
                "township_name": "Paletwa",
                "type": "township"
              },
              {
                "township_name": "Reazu",
                "type": "township"
              },
              {
                "township_name": "Sami",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "chin state",
        "type": "division"
      },
      {
        "districts": [
          {
            "district_name": "Kyaukpyu",
            "townships": [
              {
                "township_name": "Ann",
                "type": "township"
              },
              {
                "township_name": "Kyaukpyu",
                "type": "township"
              },
              {
                "township_name": "Manaung",
                "type": "township"
              },
              {
                "township_name": "Ramree",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Maungdaw",
            "townships": [
              {
                "township_name": "Buthidaung",
                "type": "township"
              },
              {
                "township_name": "Maungdaw",
                "type": "township"
              },
              {
                "township_name": "Taungpyoletwe",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Sittwe",
            "townships": [
              {
                "township_name": "Pauktaw",
                "type": "township"
              },
              {
                "township_name": "Ponnagyun",
                "type": "township"
              },
              {
                "township_name": "Rathedaung",
                "type": "township"
              },
              {
                "township_name": "Sittwe",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Thandwe",
            "townships": [
              {
                "township_name": "Gaw",
                "type": "township"
              },
              {
                "township_name": "Kyeintali",
                "type": "township"
              },
              {
                "township_name": "Maei",
                "type": "township"
              },
              {
                "township_name": "Thandwe",
                "type": "township"
              },
              {
                "township_name": "Toungup",
                "type": "township"
              }
            ],
            "type": "district"
          },
          {
            "district_name": "Mrauk-U",
            "townships": [
              {
                "township_name": "Kyauktaw",
                "type": "township"
              },
              {
                "township_name": "Minbya",
                "type": "township"
              },
              {
                "township_name": "Mrauk-U",
                "type": "township"
              },
              {
                "township_name": "Myebon",
                "type": "township"
              }
            ],
            "type": "district"
          }
        ],
        "division_name": "rakhine state",
        "type": "division"
      }
    ]
  }
}
```
