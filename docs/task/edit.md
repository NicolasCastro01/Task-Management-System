### Task - edit

## PATCH - /api/tasks/:taskId/edit

## Params
# - taskId

## Request - Url

# PATCH - /api/tasks/7/edit

## Request - Body
```
{
	"title": "vini faz a tarefa do qrcode",
	"description": "vini: blz👍",
	"finish_at": "2023-11-20T14:13:05.208Z"
}
```

## Response - Body

> Success - 200

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