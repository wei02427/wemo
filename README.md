---
title: API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="api"> v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://localhost:3000">http://localhost:3000</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="api-user">User</h1>

## 登入

<a id="opIdUserController_login"></a>

`POST /user/login`

> Body parameter

```json
{
  "Account": "string",
  "Password": "string"
}
```

<h3 id="登入-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginReqDto](#schemaloginreqdto)|true|none|
|» Account|body|string|true|none|
|» Password|body|string|true|none|

<h3 id="登入-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## 取得過往租借紀錄

<a id="opIdUserController_getRecord"></a>

`GET /user/rentRecord`

> Example responses

> 200 Response

```json
[
  {
    "LicensePlate": "string",
    "UserId": 0,
    "StartTime": "string",
    "EndTime": "string"
  }
]
```

<h3 id="取得過往租借紀錄-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="取得過往租借紀錄-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[GetRentRecordResDto](#schemagetrentrecordresdto)]|false|none|none|
|» LicensePlate|string|true|none|none|
|» UserId|number|true|none|none|
|» StartTime|string|true|none|none|
|» EndTime|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="api-scooter">Scooter</h1>

## 租車

<a id="opIdScooterController_rent"></a>

`POST /scooter/rent`

> Body parameter

```json
{
  "ScooterId": 0
}
```

<h3 id="租車-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RentScooterReqDto](#schemarentscooterreqdto)|true|none|
|» ScooterId|body|number|true|none|

> Example responses

> 201 Response

```json
{
  "RentId": 0
}
```

<h3 id="租車-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[RentScooterResDto](#schemarentscooterresdto)|

<aside class="success">
This operation does not require authentication
</aside>

## 還車

<a id="opIdScooterController_return"></a>

`POST /scooter/return`

> Body parameter

```json
{
  "RentId": 0
}
```

<h3 id="還車-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ReturnScooterReqDto](#schemareturnscooterreqdto)|true|none|
|» RentId|body|number|true|none|

> Example responses

> 201 Response

```json
0
```

<h3 id="還車-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|number|

<aside class="success">
This operation does not require authentication
</aside>

## 可用車輛

<a id="opIdScooterController_get"></a>

`GET /scooter/available`

> Example responses

> 200 Response

```json
[
  {
    "Id": 0,
    "LicensePlate": "string"
  }
]
```

<h3 id="可用車輛-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="可用車輛-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[GetAvailableListResDto](#schemagetavailablelistresdto)]|false|none|none|
|» Id|number|true|none|none|
|» LicensePlate|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_LoginReqDto">LoginReqDto</h2>
<!-- backwards compatibility -->
<a id="schemaloginreqdto"></a>
<a id="schema_LoginReqDto"></a>
<a id="tocSloginreqdto"></a>
<a id="tocsloginreqdto"></a>

```json
{
  "Account": "string",
  "Password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Account|string|true|none|none|
|Password|string|true|none|none|

<h2 id="tocS_GetRentRecordResDto">GetRentRecordResDto</h2>
<!-- backwards compatibility -->
<a id="schemagetrentrecordresdto"></a>
<a id="schema_GetRentRecordResDto"></a>
<a id="tocSgetrentrecordresdto"></a>
<a id="tocsgetrentrecordresdto"></a>

```json
{
  "LicensePlate": "string",
  "UserId": 0,
  "StartTime": "string",
  "EndTime": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|LicensePlate|string|true|none|none|
|UserId|number|true|none|none|
|StartTime|string|true|none|none|
|EndTime|string|true|none|none|

<h2 id="tocS_RentScooterReqDto">RentScooterReqDto</h2>
<!-- backwards compatibility -->
<a id="schemarentscooterreqdto"></a>
<a id="schema_RentScooterReqDto"></a>
<a id="tocSrentscooterreqdto"></a>
<a id="tocsrentscooterreqdto"></a>

```json
{
  "ScooterId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ScooterId|number|true|none|none|

<h2 id="tocS_RentScooterResDto">RentScooterResDto</h2>
<!-- backwards compatibility -->
<a id="schemarentscooterresdto"></a>
<a id="schema_RentScooterResDto"></a>
<a id="tocSrentscooterresdto"></a>
<a id="tocsrentscooterresdto"></a>

```json
{
  "RentId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|RentId|number|true|none|none|

<h2 id="tocS_ReturnScooterReqDto">ReturnScooterReqDto</h2>
<!-- backwards compatibility -->
<a id="schemareturnscooterreqdto"></a>
<a id="schema_ReturnScooterReqDto"></a>
<a id="tocSreturnscooterreqdto"></a>
<a id="tocsreturnscooterreqdto"></a>

```json
{
  "RentId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|RentId|number|true|none|none|

<h2 id="tocS_GetAvailableListResDto">GetAvailableListResDto</h2>
<!-- backwards compatibility -->
<a id="schemagetavailablelistresdto"></a>
<a id="schema_GetAvailableListResDto"></a>
<a id="tocSgetavailablelistresdto"></a>
<a id="tocsgetavailablelistresdto"></a>

```json
{
  "Id": 0,
  "LicensePlate": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Id|number|true|none|none|
|LicensePlate|string|true|none|none|

