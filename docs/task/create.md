### Task - create

### POST - /api/tasks/create

## Request - Body
```
{
	"title": "vini faz a tarefa do qrcode",
	"description": "vini: blz👍",
	"finish_at": "2023-11-20T14:13:05.208Z"
}
```

## Response - Body

> Created - 201

```
{
	"props": {
		"title": "vini faz a tarefa do qrcode",
		"description": "vini: blz👍",
		"status": {
			"description": "pending",
			"id": 1
		},
		"finishAt": "2023-11-20T14:13:05.208Z"
	},
	"id": 7
}
```