### Task - get all by filter

### GET - /api/tasks/list?filterBy=:filterBy&filterValue=:filterValue

# filterBy = [status | finishAt]
# filterValue = number | string -> Date

# Examples: filterBy=status&filterValue=1|2
# Examples: filterBy=finishAt&filterValue=2023-11-20T14:13:05.208Z

## Response - Body

> Success - 200

```
[
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
]
```