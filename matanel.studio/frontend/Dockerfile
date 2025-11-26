FROM nginx:alpine

# מחיקה של ברירת מחדל
RUN rm -rf /usr/share/nginx/html/*

# העתקת קבצי האתר
COPY . /usr/share/nginx/html

# הגדרת port דינמית ל-Cloud Run
ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
