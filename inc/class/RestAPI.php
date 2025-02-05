// Auto-resize columns and format cells
$requests = [
new Google_Service_Sheets_Request( [
'autoResizeDimensions' => [
'dimensions' => [
'sheetId' => 0,
'dimension' => 'COLUMNS',
'startIndex' => 0,
'endIndex' => count( $values[0] )
]
]
] ),
// Make header bold
new Google_Service_Sheets_Request([
'repeatCell' => [
'range' => [
'sheetId' => 0,
'startRowIndex' => 0,
'endRowIndex' => 1
],
'cell' => [
'userEnteredFormat' => [
'textFormat' => [
'bold' => true
]
]
],
'fields' => 'userEnteredFormat.textFormat.bold'
]
]),
// Format Item Price column as number
new Google_Service_Sheets_Request([
'repeatCell' => [
'range' => [
'sheetId' => 0,
'startRowIndex' => 1,
'startColumnIndex' => 9, // Index of Item Price column
'endColumnIndex' => 10
],
'cell' => [
'userEnteredFormat' => [
'numberFormat' => [
'type' => 'NUMBER',
'pattern' => '#,##0.00'
]
]
],
'fields' => 'userEnteredFormat.numberFormat'
]
]),
// Format Total Price column as number
new Google_Service_Sheets_Request([
'repeatCell' => [
'range' => [
'sheetId' => 0,
'startRowIndex' => 1,
'startColumnIndex' => 10, // Index of Total Price column
'endColumnIndex' => 11
],
'cell' => [
'userEnteredFormat' => [
'numberFormat' => [
'type' => 'NUMBER',
'pattern' => '#,##0.00'
]
]
],
'fields' => 'userEnteredFormat.numberFormat'
]
])
];