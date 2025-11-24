FROM nginx:alpine

# מחיקה של ברירת מחדל
RUN rm -rf /usr/share/nginx/html/*

# העתקת קבצי האתר
COPY . /usr/share/nginx/html

# הגדרת port דינמית ל-Cloud Run
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
