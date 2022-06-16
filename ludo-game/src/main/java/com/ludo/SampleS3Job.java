package com.ludo;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.lambda.runtime.events.models.s3.S3EventNotification.S3EventNotificationRecord;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SampleS3Job implements RequestHandler<S3Event, String> {

	@Override
	public String handleRequest(S3Event s3event, Context context) {
		List<S3EventNotificationRecord> records = s3event.getRecords();
		log.info("records ---> {}", records);
		S3EventNotificationRecord record = records.get(0);
		log.info("record ---> {}", record);
		String srcBucket = record.getS3().getBucket().getName();
		log.info("bucketName ---> {}", srcBucket);
		String srcKey = record.getS3().getObject().getUrlDecodedKey();
		log.info("path ---> {}", srcKey);
		return null;
	}

}
