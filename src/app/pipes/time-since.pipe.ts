import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince',
  standalone: true
})
export class TimeSincePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    console.log("Time since pipe", value as Date, args)

    // Date.parse(value)

    const timeDifferenceMS = Date.now() - Date.parse(value)

    const timeDifferenceSecs = Math.floor(timeDifferenceMS / 1000);
    const timeDifferenceMins = Math.floor(timeDifferenceMS / 60000);
    const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);

    console.log(`Time difference in seconds: ${timeDifferenceSecs}`);
    console.log(`Time difference in minutes: ${timeDifferenceMins}`);
    console.log(`Time difference in hours: ${timeDifferenceHours}`);

    if (timeDifferenceHours > 0) {
      return `${timeDifferenceHours} hours ago.`
    } else {
      return `${timeDifferenceMins} minutes ago.`
    }
  }

}
