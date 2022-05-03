import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import CrudService from './crud.service';

@Component
export default class Crud extends Vue {
  private CrudService: () => CrudService;
  public success = false;
  public error = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.key) {
        vm.init(to.query.key);
      }
    });
  }

  public init(): void {
    this.CrudService()
      .retrieve()
      .then(
        () => {
          this.success = true;
          this.error = false;
        },
        () => {
          this.error = true;
          this.success = false;
        }
      );
  }
}
