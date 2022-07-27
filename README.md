## Livecode 2 - Data Penduduk

### Kendala
Kamu sedang bertugas sebagai Tenaga Ahli di **Dinas Kependudukan dan Pencatatan Sipil**.
Suatu ketika Kepala Dinas meminta mu membuat kan sebuah aplikasi yang bisa mendata penduduk dan menggenerate NIK (Nomor Induk Kependudukan) dimana NIK tersebut terdiri dari:
1. tidak lebih dan kurang dari 16 digit
2. digit pertama merupakan kode provinsi
3. digit berikutnya merupakan kode kab/kota
4. digit berikutnya merupakan kecamatan
5. digit berikutnya terdiri dari *tanggal-bulan-tahun* dimana jika:
   - gender perempuan maka tanggal ditambahkan 40 `e.g` tanggal 4 jadi `4 + 40 = 44`
   - gender pria tetap
6. digtt terakhir adalah urutan (*random/increment*), `0001`, `0002`, `0003` dst
   7 hasil akhir adalah 1801053303921003

### Kriteria
1. CRUD Data Provinsi (membutuhkan waktu 1000ms)
2. CRUD Data Kabupaten/Kota (membutuhkan waktu 1000ms)
3. CRUD Data Kecamatanm(membutuhkan waktu 1000ms)
4. Register Penduduk sekaligus Generate NIKm(membutuhkan waktu 5000ms)
5. Buat dengan menggunakan proses `Asynchronous`
6. Penggunaan `Class` atau `function` di bebaskan
7. Validasi untuk Jam Layanan yaitu hanya pada jam 8 - 14 selain itu keluarkan pesan `Layanan Pembuatan KTP Sudah tutup`
8. Validasi untuk Hari Layanan yaitu hanya ada Senin-Jumat selain itu keluarkan pesan `Layanan Pembuatan KTP hanya Senin-Jumat`
9. Cek NIK jika sudah pernah buat atau terdaftar maka keluarkan pesan `NIK anda sudah terdaftar`
10. Terapkan Module Export dan Require

### Model
```js
class Province {
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }
}

class City {
    constructor(id,name,provinceCode) {
        this.id = id;
        this.name = name;
        this.provinceCode = provinceCode;
    }
}

class District {
    constructor(id,name,citiyCode) {
        this.id = id;
        this.name = name;
        this.citiyCode = citiyCode;
    }
}

class People {
    constructor(id,name,gender,nik,birthDate,placeOfBirth,provinceId,CityId,districtId) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.nik = nik;
        this.birthDate = birthDate;
        this.placeOfBirth = placeOfBirth;
        this.provinceId = provinceId;
        this.CityId = CityId;
        this.districtId = districtId;
    }
}
```

### Service
```js
class BaseService {
   add(data) {}
   get() {}
   getById(id) {}
   delete(id) {}
   update(data) {}
}

class ProvinceService extend BaseService {
    constructor() {
        this.province = [];
    }
}

class CityService extend BaseService {
    constructor() {
        this.cities = [];
    }
}

class DistrictService extend BaseService {
    constructor() {
        this.districts = [];
    }
}

class PeopleService {
    constructor() {
        this.people = [];
    }
    register(people) {}
    get() {}
    getByNIK(nik) {}
}
```
