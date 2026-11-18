{{- define "mistica-web.imageRef" -}}
{{- printf "%s/%s/%s/web:%s" .Values.docker.registry .Values.docker.project .Values.docker.repoPrefix .Values.image.tag -}}
{{- end -}}

{{- define "mistica-web.labels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}

{{- define "mistica-web.resourceName" -}}
{{- $name := index . 1 -}}
{{- if (index . 0).Values.resourceNamePrefix -}}
{{- printf "%s-%s" (index . 0).Release.Name $name -}}
{{- else -}}
{{- $name -}}
{{- end -}}
{{- end -}}
