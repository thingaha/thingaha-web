const donationsDB = [
  {
    id: 1,
    user: {
      id: 1,
      user_name: 'naruto',
      email: 'naruto@example.com',
      address: '88, Strand Road, Kyauktada Township, Yangon.',
      role: 'admin',
      country: 'mm',
    },
    year: 2020,
    month: 'january',
    student: {
      id: 1,
      name: 'naruto',
      deactivated_at: '',
      birth_date: '1990-08-02',
      father_name: 'U Aye',
      mother_name: 'Daw Aye',
      parents_occupation: 'Farmer',
      address_id: 10,
    },
    amount_jpy: 3000,
    amount_mmk: 30000,
    status: 'pending',
  },
  {
    id: 2,
    user: {
      id: 4,
      user_name: 'kakashi',
      email: 'kakashi@example.com',
      address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
      role: 'donator',
      country: 'jp',
    },
    year: 2020,
    month: 'january',
    student: {
      id: 2,
      name: 'naruto',
      deactivated_at: '',
      birth_date: '1990-08-01',
      father_name: 'U Aye Aye',
      mother_name: 'Daw Aye Aye',
      parents_occupation: 'Farmer',
      address_id: 11,
    },
    amount_jpy: 3000,
    amount_mmk: 30000,
    status: 'pending',
  },
]

export const getDonationsForMonth = async (yser, month) => {
  // mock response for users api call

  return {
    data: {
      donations: donationsDB,
    },
  }
}
